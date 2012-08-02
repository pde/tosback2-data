/*Mint Analytics Code Base*/
if ("undefined" == typeof(wa)) {wa = new Object();}
wa.lastUpdate="20120719";
/* Last update: update internalDomains; remove wa.buildNum | (bcj|Evolytics, LLC) */

/************************** START CONFIG SECTION **************************/
wa.reportSuiteQA="intuitmintqa"
wa.reportSuiteProd="intuitmintprod"
wa.internalDomains="safe-secure.mint.com,lp.mint.com,free.mint.com,data.mint.com,www.mint.com,wwws.mint.com,forums.mint.com,maintenance.mint.com,blog.mint.com,satisfaction.mint.com,getsatisfaction.com,fool.mint.com,answers.mint.com,stage-mini-www.mint.com,stage-www.mint.com,stage-mini.mint.com,stage.mint.com";  //comma seperate list
wa.defaultSiteName="mint";
wa.defaultSiteGroup="mktg";
wa.bu=""; //optional if site aligns with larger business unit
/************************** END CONFIG SECTION **************************/

//change s_account to prod if hostname begins with one of the production hosts listed in wa.internalDomains
	var hostname = window.location.hostname;
	wa.hostname=hostname;
	wa.isHostProd = wa.hostname.search(/^data.mint.com|^www.mint.com|^wwws.mint.com|^forums.mint.com|^maintenance.mint.com|^blog.mint.com|^satisfaction.mint.com|^getsatisfaction.com|^fool.mint.com|^answers.mint.com|^safe.secure-mint.com/);
	if (wa.isHostProd == 0) { s_account=wa.reportSuiteProd; } else { s_account=wa.reportSuiteQA; }
	var s=s_gi(s_account)
	
/* Standard Configs */
s.dynamicAccountSelection=false
s.dynamicAccountList= wa.reportSuiteProd+"="+wa.internalDomains;
s.charSet="UTF-8"
s.currencyCode="USD"
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true  //clickmap
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,xlsx,docx"
s.linkInternalFilters="javascript:,"+wa.internalDomains
s.linkLeaveQueryString=false  //exit link and download link reports
s.linkTrackVars="prop3,eVar3,prop4,eVar4,eVar7,eVar9,eVar10,eVar12,prop26,eVar32,eVar37,eVar43,eVar50,prop60,eVar60,prop61,prop62,prop63,eVar61,state,zip"
s.linkTrackEvents="None"
s.server=hostname;

var curl=location.href.toLowerCase();
curl=curl.replace(/\+/g," ");	//convert all "+" to space (on 12/6/10, cid started showing "+")

if(curl.indexOf('?')>-1) { 						//check for query string parameters
	//decode url + remove duplicate "?" from query string
	curl=curl.split('?');
	for(var i=0; i<curl.length; i++ ) { 
		curl[i]=unescape(curl[i]);
		curl[i]=curl[i].replace(/[?]/gi,'&');	//global search of string for "?", replace with "&"
	}
	//if a url has a '?' at the end, but no following parameters, do not add it back to the string
	if(isVarEmpty(curl[curl.length-1])) {
		curl.splice(curl.length-1,1);
	}
	curl=curl.join("?");
}

var waRefer=getCookie('wa_refer'); //for use with T&T Redirect Offers
if(waRefer=="none") { waRefer=""; }
if(!isVarEmpty(waRefer)) {
    var rurl=waRefer.toLowerCase(); //define rurl from cookie 
	s.referrer=rurl;
    setCookie('wa_refer','',-1); // delete cookie
} else {
    var rurl=document.referrer.toLowerCase(); //define rurl from dom
}
rurl=rurl.replace(/\+/g," ");	//convert all "+" to space (on 12/6/10, keywords started showing "+")

var rdomain=rurl.replace(/(\/\/[^\/]+\/).*/,'$1');
var cleanDomain=rdomain.replace(/www.|http:|https:|\//g,"");
var isInternalDomain = wa.internalDomains.indexOf(cleanDomain);
var atgShopperId = getCookie("SHOPPER_USER_ID");//not currently used for mint
wa.userGuid = getCookie("userguid");
(wa.newCustomer) ? wa.userGuid=wa.newCustomer : wa.userGuid=wa.userGuid;
if (wa.userGuid) {s.eVar43=wa.userGuid;}
var urlRegExp = /(\w+):\/\/([\w.:-]+)\/?([\w.\/-]*\/)?([^\/?]*)\??(\S*)/;
var urlArray = curl.match(urlRegExp);
var defaultPath = (urlArray[3] != undefined) ? urlArray[3] : "";

waSetDefaultVariables();
/* Set Default Variables */
function waSetDefaultVariables() {


if (urlArray[4]) {defaultPage = urlArray[4];}  
else {if ((!urlArray[4])&&(!urlArray[3])) {defaultPage="index";}  else {defaultPage="";}}
if (defaultPage) {defaultPage=defaultPage.replace(/.php|.jsp|.cfm|\.com|.shtml|.html|.htm|.event/g,'');}
//trim defaultPage value to prevent truncation of siteGroup in pageName (pageName must be < 100 chars)
if(defaultPage.length > 75) { defaultPage=defaultPage.slice(0,75); }
if (defaultPath) {defaultPath=defaultPath.replace(/\/$/g,'');}

//Assign the defaultSiteGroup based on hostname/curl
switch(hostname)
{		
	case "wwws.mint.com": case "fool.mint.com":
		if(curl.indexOf("internalError.html")>-1) { wa.defaultSiteGroup="other";}
		else {wa.defaultSiteGroup="app"; }
		break;	
	case "www.mint.com":
		if(curl.indexOf("/blog")>-1) {	wa.defaultSiteGroup="blog"; }
		else { wa.defaultSiteGroup="mktg"; }
		break; 
	case "forums.mint.com":
		wa.defaultSiteGroup="forums";
		break;	
	case "maintenance.mint.com":
		wa.defaultSiteGroup="maint";
		break;
	case "blog.mint.com":
		wa.defaultSiteGroup="blog";
		break;
	case "satisfaction.mint.com":
		wa.defaultSiteGroup="sup";
		break;
	case "getsatisfaction.com":
		wa.defaultSiteGroup="sup";
		break;
	case "answers.mint.com":
		wa.defaultSiteGroup="answers";
		break;
	case "data.mint.com":
		wa.defaultSiteGroup="glocal";
		break;
	default:		
		wa.defaultSiteGroup="mktg";
		break;
}

//Check for varaibles set on page else use default values
if (wa.siteName == null || typeof wa.siteName == "undefined")
   {wa.siteName=wa.defaultSiteName;} else {wa.siteName=wa.siteName.toLowerCase();}
if (wa.pageDir == null || typeof wa.pageDir == "undefined")
   {wa.pageDir=defaultPath;} else {wa.pageDir=wa.pageDir.toLowerCase();}
if (wa.pageSubDir == null || typeof wa.pageSubDir == "undefined")
   {wa.pageSubDir="";} else {wa.pageSubDir=wa.pageSubDir.toLowerCase();}
if (wa.pageDetail == null || typeof wa.pageDetail == "undefined")
   {wa.pageDetail=defaultPage;} else {wa.pageDetail=wa.pageDetail.toLowerCase();}
// Check to see if Mint system parameters (#location:{) exist in pageDetail; Remove, if present
wa.pageDetail=waTruncateString(wa.pageDetail,'#location:{');
wa.pageDetail=waTruncateString(wa.pageDetail,'#location:%7b');

 //Page Specific Logic  
switch(wa.pageDetail)
{
	case "login":  
		var qrySource=waGetQueryString("source");
		if(!isVarEmpty(qrySource)) { if(qrySource.indexOf('tto')>-1) { qrySource=true; } else { qrySource=false; } }
		var qryTask=waGetQueryString("task");
		if(!isVarEmpty(qryTask)) { qryTask=qryTask.toLowerCase(); }
		
		wa.pageState=locateElementByClassName("li","selected");	//determine which tab is selected (signup or login)		
		
		if (wa.pageState=="signup" || qrySource) {
			if(wa.pageState!="signup" && qryTask!="s") {
				waLoginTabHandler();
			}
			else{ 
				waSignupTabHandler(); 
			}
		} 
		 else {
			waLoginTabHandler();
		}
		 wa.tempPageDetail=wa.pageDetail;
		 wa.pageDetail=wa.pageDetail+"/"+wa.pageState;
		 addOnClickToElementById("signup",wa.tempPageDetail);		//add on-click to Signup button
		 addOnClickToElementById("login",wa.tempPageDetail);		//add on-click to Login button
		break;
		
	case "overview":
		s.events="event5";
		if(!isVarEmpty(wa.userGuid)) {s.events=s.events+",event6:"+wa.userGuid;}

		break;	
		
	case "trend": 
		s.events="event5";
		if(!isVarEmpty(wa.userGuid)) {s.events=s.events+",event6:"+wa.userGuid;}
		break;

	case "save":
		wa.tempPageDetail=wa.pageDetail;
		break;
		
	case "support":
		wa.defaultSiteGroup="sup";  //move the support page in the app to sup site section
		break;
}
 
if (wa.pageFunc == null || typeof wa.pageFunc == "undefined")
   {wa.pageFunc="";} else {wa.pageFunc=wa.pageFunc.toLowerCase();}
if (wa.siteGroup == null || typeof wa.siteGroup == "undefined")
   {wa.siteGroup=wa.defaultSiteGroup;} else {wa.siteGroup=wa.siteGroup.toLowerCase();}
   


  
  
  
  
  
  
/***********  BEGIN CALL SAMPLING LOGIC  ***********/

/*
    wa.isTrackable()
    - pv_guid = userGuid; last 2 characters will be checked
    - pv_regEx1 = RegEx validation string for 1st of 2 characters to check
    - pv_regEx2 = RegEx validation string for 2nd of 2 characters to check

    Both pv_regEx1 and pv_regEx2 must pass validation in order for function to return true. 
*/
wa.isTrackable=function(pv_guid,pv_regEx1, pv_regEx2){
    var theGuid, theGuidPos1, theGuidPos2;
    var rtn_isTrackable; //true|false - returns true if visitor is to be tracked for specified server calls

    theGuid=pv_guid.substr(pv_guid.length-2); //grab last two digits of pv_guid
    theGuidPos1=theGuid.substr(0,1);    	//grab 1st digit
    theGuidPos2=theGuid.substr(1,1);    	//grab 2nd digit

    if(theGuidPos1.search(pv_regEx1)>-1) {	//digit must exist in pv_regEx1 range
        if(theGuidPos2.search(pv_regEx2)>-1) { rtn_isTrackable=true; } //digit must exist in pv_regEx2 range
		else { rtn_isTrackable=false; }
    } else { rtn_isTrackable=false; }
	
    return(rtn_isTrackable);
}

if(wa.isHostProd>-1) { //sample in production...
    if(wa.siteGroup=="app") { //sample impression tracking (10%) in-product
		//impression tracking
            wa.trackImpressions=wa.isTrackable(wa.userGuid,/[0-1]/,/[0-5]/); //return [true|false]
                //5%: first digit must equal 0 or 1 >> /[0-1]/ || second digit must be 0-5 >> /[0-5]/
            (wa.trackImpressions) ? s.prop62="impr(5pct)":s.prop62="";
            (s.prop62) ? s.prop63='D=pageName+"--"+c62':s.prop63="";
        
        //overview page link tracking
            wa.sampleLinkTrack=wa.isTrackable(wa.userGuid,/[2-3]/,/[0-5]/); //return [true|false]
                //5%: first digit must equal 0 or 1 >> /[2-3]/ || second digit must be 0-5 >> /[0-5]/
            (wa.sampleLinkTrack) ? s.prop62="link(5pct)":s.prop62="";
            (s.prop62) ? s.prop63='D=pageName+"--"+c62':s.prop63="";
	} else { //track 100% of impressions outside the product (public/mktg sites)
		wa.trackImpressions=true;   //impression sampling
        wa.sampleLinkTrack=true; //overview page link sampling
		s.prop62=s.prop63="";
	}
} else { //track ALL (100%) in dev/qa
    //impression tracking
        wa.trackImpressions=wa.isTrackable(wa.userGuid,/[0-1]/,/[0-5]/); //would user be tracked in production?
        s.prop62="impr(5pct) ["+wa.trackImpressions+"]";
        (s.prop62) ? s.prop63='D=pageName+"--"+c62':s.prop63="";
        wa.trackImpressions=true; //track ALL impressions in dev/qa
        
    //overview page link tracking
        wa.sampleLinkTrack=wa.isTrackable(wa.userGuid,/[2-3]/,/[0-5]/); //return [true|false]
        s.prop62="link(5pct) ["+wa.sampleLinkTrack+"]";
        (s.prop62) ? s.prop63='D=pageName+"--"+c62':s.prop63="";
        wa.sampleLinkTrack=true; //track ALL overview page links in dev/qa
}

/***********  END CALL SAMPLING LOGIC  ***********/
  

 
 
  
  
  
  
  
  
 
//Omniture Variable Configuration
s.eVar1=s.prop1=wa.bu;
if (s.prop1!="") {s.prop2=s.prop1+":"+wa.siteName;s.eVar2="D=c2";} else {s.prop2=wa.siteName;s.eVar2="D=c2";}
if (s.prop2) {s.prop3=s.prop2+":"+wa.siteGroup;s.eVar3="D=c3";} else {s.prop3=wa.siteGroup;s.eVar3="D=c3";}
if (wa.pageDir) s.pageName=wa.pageDir; 
if (wa.pageSubDir) s.pageName=s.pageName?s.pageName+"/"+wa.pageSubDir:wa.pageSubDir;
if (s.pageName) {s.prop4=s.pageName+" |"+s.prop3;s.eVar4="D=c4";} 
	else {s.prop4=wa.pageDetail+" |"+s.prop3;s.eVar4="D=c4";}
if (wa.pageDetail) { s.pageName=s.pageName?s.pageName+"/"+wa.pageDetail+" |"+s.prop3:wa.pageDetail+" |"+s.prop3; }
else { if(!wa.pageSubDir) { s.pageName=s.prop4; } }

if(s.prop4) { s.eVar50="D=c4"; } //Page Main Nav eVar

s.eVar27="D=g"; 
s.channel=wa.siteName;
s.prop15=calculateDate();s.eVar15="D=c15";
s.eVar16=s.eVar19="D=g";  //entry URL

if(!isVarEmpty(wa.testCell)) { wa.testCell=wa.testCell.toLowerCase(); s.eVar47=wa.testCell; } //test&target

if (isInternalDomain == -1) {
	s.eVar17="D=r"; //referring url/visit
	s.eVar18="D=r"; //referring url/visitor
} else  {
	rurl= ""; 
	cleanDomain="";
}
//if (atgShopperId){s.prop41 = "|"+atgShopperId+"|";s.eVar41="D=c41";}
}
/* END waSetDefaultVariables() */

function waBuildPageDetail(pv_details) {
	var tempPageDetail;
	var argLength
	
	argLength=arguments.length;
	if(argLength>1) {	//if more than one parameter is passed, loop through all to build page detail
		tempPageDetail=pv_details;
		for( var i=1;i<argLength;i++ ) {
			if(!isVarEmpty(arguments[i])) {
				tempPageDetail=tempPageDetail+"/"+arguments[i];
			}
		}
		tempPageDetail=wa.pageDetail+"/"+tempPageDetail+" |"+s.prop3;
		if(wa.pageDir) { tempPageDetail=wa.pageDir+"/"+tempPageDetail; }
		if(wa.stickyCid) { tempPageDetail=wa.stickyCid+" -- "+tempPageDetail; }
		
		return(tempPageDetail);
	} else {	
		if(!isVarEmpty(pv_details)) {
			tempPageDetail=wa.pageDetail+"/"+pv_details+" |"+s.prop3;
			if(wa.pageDir) { tempPageDetail=wa.pageDir+"/"+tempPageDetail; }
			if(wa.stickyCid) { tempPageDetail=wa.stickyCid+" -- "+tempPageDetail; }
			return(tempPageDetail);
		} else {
			return(s.pageName);
		}
	}
}

function waIraActions(pv_details,pv_action,pv_userSegmentation) {
	if(isVarEmpty(pv_userSegmentation)) { pv_userSegmentation=""; }
	s.events=""; //Clear any 'lingering' or unnecessary events
	wa.pageDir="ira"
	wa.pageDetail=pv_details;
	waSetDefaultVariables();
	
	switch(pv_details) {
		case "intro":					
			s.events="event21"; //IRA Intro
			//send dynamic mbox call here:  mint_ira_intro_metrics
			//wa.fireMbox('waDynamicMbox','mint_ira_intro_metrics','mintUserSegmentation='+pv_userSegmentation);
			break; 
		case "quiz":	
			wa.bypassStickyCid=true; //do NOT replace s.prop26 value with new value in doPlugins
			switch(pv_action) {
				case "age":		s.events="event22"; break; //IRA Age
				case "filing status":
				case "quiz":	s.events="event23"; //IRA Quiz / Filing Status (first question in both versions of quiz)
					//send dynamic mbox call here:  mint_ira_quiz_metrics
					//wa.fireMbox('waDynamicMbox','mint_ira_quiz_metrics','mintUserSegmentation='+pv_userSegmentation);
					break;
				case "income":	s.events="event24"; break;//IRA Quiz - Income Question
			}
			break;
		case "results":
			wa.bypassStickyCid=true; //do NOT replace s.prop26 value with new value in doPlugins
			s.events="event25";  //IRA Results
			//send dynamic mbox call here:  mint_ira_results_metrics
			//wa.fireMbox('waDynamicMbox','mint_ira_results_metrics','mintUserSegmentation='+pv_userSegmentation);
			break;
	}
}

//function to call dynamic mboxes (mbox.js is required)
/* wa.fireMbox = function(pv_div,pv_mboxName,pv_mboxParameter) {
	var mboxExists='false';
	if(wa.mboxList) {
		var mboxListLength=wa.mboxList.length;
		for(var i=0;i<mboxListLength;i++) {
			if(pv_mboxName==wa.mboxList[i]) { //check to see if mbox exists
				mboxExists='true';break;
			} else { mboxExists='false'; }
		}
		if(mboxExists=='false') {  //create mbox if not already present
			if(pv_mboxParameter) { mboxDefine(pv_div,pv_mboxName,pv_mboxParameter); } else { mboxDefine(pv_div,pv_mboxName); }
			wa.mboxList.push(pv_mboxName);
		}
	} else {  //only define a specified mbox the first time this function is called
		if(pv_mboxParameter) { mboxDefine(pv_div,pv_mboxName,pv_mboxParameter); } else { mboxDefine(pv_div,pv_mboxName); }
		wa.mboxList=new Array();
		wa.mboxList.push(pv_mboxName);
	}	
	//update the mbox every time this function is called
	if(pv_mboxParameter) { 
		mboxUpdate(pv_mboxName,'mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9,pv_mboxParameter); 
	} else { 
		mboxUpdate(pv_mboxName,'mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9); 
	}
} */

/* jQuery event listener for video clicks: detects click on any item that contains both
 * "launch" and "vid" in the class name (e.g., launch_video, launch_security_video); returns
 * class name as 2nd parameter in s.tl call performed by waVideoClick function...
 */
try{
	var videoItem = $('[class*=launch][class*=vid]');
	if (videoItem) {
		videoItem.click(function(){
			waVideoClick( this, $(this).attr("class") ) 
		});
	}
}
catch(err){ 
	/*ignore error*/ 
}

s.usePlugins=true;
function s_doPlugins(s) {
	// The cross-domain campaign tracking variable that value is pulled from a query string parameter.
	s.prop21= s.getQueryParam('scid','',curl);if(!isVarEmpty(s.prop21)) { s.eVar21="D=c21"; }

	// The within-domain campaign tracking variable that is pulled from a query string parameter.
	s.prop22 = s.getQueryParam('xcid','',curl);if(!isVarEmpty(s.prop22)) { s.eVar22="D=c22"; } 
	
	// The priority code is pulled from a query string parameter.
	s.prop23 = s.getQueryParam('priorityCode','',curl);if(!isVarEmpty(s.prop23)) { s.eVar23="D=c23"; } 

	// The source is pulled from a query string parameter or the wa.mintSource variable (set on page by mint eng)
	//s.eVar24 = s.getQueryParam('source','',curl);
	if(wa.mintSource) {
		s.eVar24=wa.mintSource;
	} else {
		var qrySource=s.getQueryParam('source','',curl);
		(qrySource) ? s.eVar24=qrySource : s.eVar24="";
	} 
	
	
	//Campaign tracking 	
	var cid
		if(!cid) { cid=s.getQueryParam('cidopem','',curl); }	//op email
		if(!cid) { cid=s.getQueryParam('cidmtgem','',curl); }	//mktg email
		if(!cid) { cid=s.getQueryParam('cidqkn','',curl); }		//quicken
		if(!cid) { cid=s.getQueryParam('cidppc','',curl); }		//ppc
		if(!cid) { cid=s.getQueryParam('cidaff','',curl); }		//affiliate
		if(!cid) { cid=s.getQueryParam('cidsoc','',curl); }		//social
		if(!cid) { cid=s.getQueryParam('cidall','',curl); }		//alliance
		if(!cid) { cid=s.getQueryParam('cidxsell','',curl); }	//cross-sell
		if(!cid) { cid=s.getQueryParam('cidbn','',curl); }		//banner
	
	// check for affiliate tracking if no CID exists
	if(!cid) {
		wa.pid=s.getQueryParam('pid','',curl); 					//affiliate-cj
		wa.kbid=s.getQueryParam('kbid','',curl); 				//affiliate-kowabunga
		
		if(wa.pid) 	{ cid="aff_cj_"+wa.pid; }
		if(wa.kbid) { cid="aff_kb_"+wa.kbid; }
	}
	
	//if no cid, look for generic 'cid' parameter
	if(!cid) { cid=s.getQueryParam('cid','',curl); }			//generic
	
	//if no cid look for google campaign tracking code
	if (!cid) 
		{utm_source=s.getQueryParam('utm_source','',curl);		//google campaign parameters
		 if (utm_source) 
		    {utm_medium=s.getQueryParam('utm_medium','',curl);
			 utm_campaign=s.getQueryParam('utm_campaign','',curl);
			 cid=utm_source+"_"+utm_medium+"_"+utm_campaign; 
			}
		}
	//end custom
	if(cid) {
		if(cid.indexOf('#location:{')>-1) { cid=waTruncateString(cid,'#location:{'); } //clean up cid
		s.campaign = cid;
		s.campaign=s.getValOnce(s.campaign,'s_cmp',0);
		
		//set var to prevent replacing cid with referring domain (cleanDomain) on calls where page does not reload
		if(s.campaign==""&&cid==getCookie("s_cmp")){ var isExistingCampaign=true; } 
		
		(!isVarEmpty(s.campaign)) ? s.prop25=s.eVar25="D=v0" : s.prop25=s.eVar25="";
		s.prop42=waCrossVisitParticipation('wa_cpm',cid,7,'>',180); (!isVarEmpty(s.prop42)) ? s.eVar42="D=c42" : s.eVar42="";
	}

	/*
		* URS logic follows..., 
    */
     var ursvar="";
     var ppckw="";
	 var ppcdomain="";
     var natkw="";
     if (s.campaign) {ursvar = s.campaign}
	if(isExistingCampaign) { 
		ursvar=s.eVar28=s.eVar29=s.eVar30=s.eVar42="";
	}
	else if (s.campaign==""&&cleanDomain == "") {ursvar = ""; }
	else		
         { orgDomains = new Array ("bing.","q","a9.","*,q","abacho.","q","ah-ha.","q","alexa.","q","allesklar.","wo,words","alltheweb.","q,query","altavista.","q","aol.","query","arianna.","query,b1","asiaco.","query,qry","ask.","q,ask","atlas.","q","austronaut.","begriff,suche","auyantepui.","clave","bluewin.","qry,q","centrum.","q","club-internet.","q","dino-online.","query","dir.com.","req","dmoz.","search","dogpile.","q,qkw","eniro.","q","euroseek.","string,query","exalead.","q","excite.","search,s,qkw","findlink.","key","findwhat.","mt","fireball.","q","freeserve.","q","gigablast.","q","go2net.","general","goeureka.","key","google.","q,as_q,as_epq,as_oq","googlesyndication.","url","greekspider.","keywords","hotbot.","query,mt","ilor.","q","iltrovatore.","q","index.nana.co.il.","q","infoseek.","qt,q","infospace.","qkw","intuitsearch.","q","iwon.","searchfor","ixquick.","query","jubii.","query,soegeord","jyxo.","s","kanoodle.","query","kataweb.","q","kvasir.","q","live.","q","looksmart.","qt,key,querystring","lycos.","query,mt,q,qry","mamma.","query","metacrawler.","q,general,qry","msn.","q,mt","mywebsearch.","searchfor","mysearch.","searchfor","netex.","srchkey,keyword","netscape.","search,searchstring,query","netster.","keywords","nettavisen.","query,q","ninemsn.","q","nlsearch.","qr","nomade.","mt,s","northernlight.","qr","oozap.","query","overture.","keywords","ozu.","q","passagen.","q","quick.","ftxt_query","savvy.","s","scrubtheweb.","keyword,q","www.search.com.","q","searchalot.","q","searchhippo.","q","sensis.","find","seznam.","w","soneraplaza.","qt","splatsearch.","searchstring","sprinks.","terms","spray.","query","srch.","q","supereva.","q","teoma.","q","thunderstone.","q","tiscali.ch.","key","tjohoo.","soktext,mt,query","track.","qr","truesearch.","query","tygo.","s","vinden.","query","virgilio.","qs","vivisimo.","query","voila.","kw","walla.","q","wanadoo.","fkw","web.","su","webcrawler.","qkw,search,searchtext","webwatch.","findindb","wepa.","query","wisenut.","q","xpsn.","kwd","ya.","q","yahoo.","p,va,vp,vo","ynet.","q","zerx.","search");
           domainFound = "";
           for ( var i=0; i<orgDomains.length; ++i )
               {
			   if (domainFound != "")
                     { orgParams = orgDomains[i].split(",");
                       for (j=0; j<orgParams.length; ++j)
                           {var parsekw = s.getQueryParam(orgParams[j],'',rurl)   
							if (parsekw) { 
								if (ursvar) {
									ppckw=parsekw; 
									ppcdomain=orgDomains[i]; 
									break;
								} else {
									ursvar = cleanDomain + " [seo]"; natkw=parsekw; break;
								}
                             }
                           }
						   if(domainFound=="google.") {
								var googleEncrypted=rurl.match(/\?q=$|\&q=$/g); //?q= or &q= at end of rurl
								if(!googleEncrypted) { googleEncrypted=rurl.match(/\?q=\&+|\&q=\&+/g); } //?q= or &q= anywhere in rurl
								if(googleEncrypted) {
									ursvar = cleanDomain + " [seo]"; natkw=parsekw="[google encrypted]"; break;
								}	
							}
						  break;
                     }
                 if (orgDomains[i].indexOf(".") >= 0 &&
                     rurl.indexOf(orgDomains[i]) >= 0)
                     { domainFound = orgDomains[i]; }
                 if (parsekw)
                     { break; }
               }
			if (!parsekw&&!s.campaign&&cleanDomain) { 
				cleanDomain.indexOf("mail")>-1 ? ursvar=waSpliceDelimitedString(cleanDomain,'.',3) +" [ref]" : ursvar=cleanDomain+" [ref]";
			}
         }
		s.prop28=s.getValOnce(ursvar,'c_28',0); (!isVarEmpty(s.prop28)) ? s.eVar28="D=c28" : s.eVar28="";
		s.prop42=waCrossVisitParticipation('wa_cpm',ursvar,7,'>',180); (!isVarEmpty(s.prop42)) ? s.eVar42="D=c42" : s.eVar42="";
		s.prop29=ppckw; (!isVarEmpty(s.prop29)) ? s.eVar29="D=c29" : s.eVar29="";
		if(!isVarEmpty(ppcdomain)) { s.eVar51=ppcdomain; }
		if(!isVarEmpty(natkw)) { natkw=natkw.replace(/\n|\t/g," "); } // \n\r=crlf, \n=new line, \t=tab - natkw.replace(/\#|\?|\%|\"|\'|\n|\t/g," "));	
		s.prop30=natkw; (!isVarEmpty(s.prop30)) ? s.eVar30="D=c30" : s.eVar30="";
	
	//Build Page Detail
	stickyCid = wa.stickyCid = s.getAndPersistValue(ursvar,'ursvar')
	if(wa.pageDetail=="overview"&& !isVarEmpty(wa.pageState)) {	
		if (stickyCid) {s.prop26= stickyCid+" -- "+wa.pageDetail+"/"+wa.pageState+"|"+s.prop3;} else {s.prop26= wa.pageDetail+"/"+wa.pageState+"|"+s.prop3; }
	} 
	else if(wa.linkName) { } 
	else if (wa.isMsgId) {
		var messageId=s.getQueryParam('messageId','',curl);
		if(!isVarEmpty(messageId)) {
			if(messageId.indexOf('#location:{')>-1) {messageId=waTruncateString(messageId,'#location:{'); } //strip #locaion... if present
			s.prop7=wa.msgId="msg"+messageId;
			if (stickyCid) {s.prop26= stickyCid+" -- "+wa.pageDetail+"/"+wa.msgId+"|"+s.prop3;}else {s.prop26= wa.pageDetail+"/"+wa.msgId+"|"+s.prop3; }
		}
	} 
	else if (wa.bypassStickyCid) { s.prop26=s.prop26; }
	else if (stickyCid) {s.prop26= stickyCid + " -- " + s.pageName;}else { s.prop26= s.pageName; }

	if(!s.prop26) { s.prop26=s.pageName; }
	
	if(!isVarEmpty(wa.testCell)) 	{ s.prop26=wa.testCell+" -- "+s.prop26; }
	if(!isVarEmpty(wa.w2iQuiz)) 	{ s.prop26=wa.w2iQuiz+" -- "+s.pageName;}
	
	//*Get paid search keyword if not found in rurl try 
	if (!ppckw) {
		s.prop29=s.eVar29=ppckw=s.getQueryParam('kw','',curl);
		s.eVar51=s.getQueryParam('ven',curl);
	}
	
	//If on blog section of site, capture search parameters from query string
	if(wa.defaultSiteGroup=="blog") 
	{ 
		//Capture the search parameter, if present
		s.prop31=s.getQueryParam('s','',curl); if(!isVarEmpty(s.prop31)) { s.eVar31="D=c31";}
		//Rebuild the page name, based on ?cat query parameter
		var tempQueryParam=s.getQueryParam('cat','',curl);
		if(!isVarEmpty(tempQueryParam)) { s.pageName=wa.pageDir+"/"+tempQueryParam+" |"+s.prop3; }
		else {s.pageName=s.pageName;}
	}
	//Set Page Specific Values
	switch(wa.pageDetail)
	{
		case "": //custom s.prop26 value for use on https://www.mint.com/m/  (pageName="m |mint:mktg")
			if(wa.pageDir=="m") { 
				if (stickyCid) { 
					s.prop26= stickyCid + " -- " + wa.pageDir;
					wa.mobileDeviceType ? s.prop26=s.prop26+"/"+wa.mobileDeviceType+" |"+s.prop3 : s.prop26=s.prop26+" |"+s.prop3;
				} else { 
					wa.mobileDeviceType ? s.prop26=wa.pageDir+"/"+wa.mobileDeviceType+" |"+s.prop3 : s.prop26=wa.pageDir+" |"+s.prop3;
				} 
			}
			if(wa.pageDir=="life-insurance") {
				if(wa.w2sLifeQuizStart=='age') {
					s.prop26=waBuildPageDetail('save/life/wizard/age');
					if(s.prop26.indexOf('life-insurance//')>-1) { s.prop26=s.prop26.replace('life-insurance//',''); }
					wa.w2sLifeQuizStart='';
				}
			}
			break;
		case "welcome": case "fue":
			if(wa.newCustomer) 
			{ 
				s.events="event3,event4:"+wa.userGuid;//wa.newCustomer;
				if(stickyCid) { s.eVar20=stickyCid; } else { s.eVar20="no_source"; }
			}
			break;
		
		case "save":  //logic to determin which page of the wts page is on
			wa.pageState=s.getQueryParam('task','',curl);
			if(!isVarEmpty(wa.pageState)) {
				s.pageName=wa.pageDetail+"/"+wa.pageState+" |"+s.prop3; 
			} else { 
				s.pageName=wa.pageDetail+"/cc |"+s.prop3; //page defaults to credit card tab if no param sent
			}  
			s.prop4=s.pageName;
			if (stickyCid) {s.prop26= stickyCid + " -- " + s.pageName;}else {s.prop26= s.pageName; }
			if(wa.pageState=='life') {
				if(wa.w2sLifeQuizStart=='age') {
					s.prop26=waBuildPageDetail(wa.pageState+'/wizard/age');
					wa.w2sLifeQuizStart='';
				}
			}
			break;
		
		case "transaction":  //logic to determin which transaction page the user is on
			if(wa.pageNumber){
				if(wa.pageNumber!="1" ){
					waTransactionBuildPageName();//s.pageName=wa.pageDetail+"/"+wa.pageNumber+" |"+s.prop3; 
				}
			}
			if (stickyCid) {s.prop26= stickyCid + " -- " + s.pageName;}else {s.prop26= s.pageName; }

			//use the following to prevent duplicate page calls on transaction page.
				//referenced in waTransactionActions() function.
				wa.transPageCallAlreadyMade=true;
				wa.transTempPageNumber=wa.pageNumber;	
			break;
		
		//build s.prop26 for goals pages and overlays  (get started / goals set / goal):  prop26=pageDetail/goalType/pageOverlay/goalAlert |prop3
		case "get started":  case "goals set":  case "goal":
			if(wa.goalType)	{
				s.prop26=wa.pageDir
					if(wa.pageDetail)	{ s.prop26=s.prop26+"/"+wa.pageDetail; }
					if(wa.pageOverlay)	{ 
						if(wa.goalType)	{ s.prop26=s.prop26+"/"+wa.goalType.toLowerCase(); }
						s.prop26=s.prop26+"/"+wa.pageOverlay; 
						if(wa.goalAlert)	{ s.prop26=s.prop26+"/"+wa.goalAlert; } //wa.goalAlert populated for get out of debt goals
					}
				s.prop26=s.prop26+" |"+s.prop3;
				s.prop26=s.prop26.toLowerCase();
			}
			break;
		default:
			break;
	}
	if(wa.pageDetail=="index") {
		if(wa.showIpadOverlay=="true") {
			s.prop26=waBuildPageDetail("ipad");
		}
	}

	//add "tour" indicator to page detail if "tour tips" experience is visible to the user
	if(wa.isTourDisplayed) {
		if(wa.pageDetail=="overview") { s.prop26=waBuildPageDetail("tour"); }
	}
    if(wa.billpayWelcomeMat) {
        if(wa.pageDetail=="overview") { s.prop26=waBuildPageDetail((wa.billpayPrice)?"billpay/"+wa.billpayPrice:"billpay"); }
    }
}  
//End do_plugins



/* PHASE 2 */
//Scope:  Login	
if(wa.userLogin=="true") { 
	//wa.userlogin not populated on new user signup
	var userLoginData = new Array();  //build array to use for creating wa_login cookie
	if(!isVarEmpty(wa.userCreateDate)) 		{ userLoginData[0]=wa.userCreateDate; 			} 	else { userLoginData[0]=""; } 	//date of account creation
	if(!isVarEmpty(wa.userLastLogin)) 		{ userLoginData[1]=wa.userLastLogin; 			} 	else { userLoginData[1]=""; }  	//date of last login
	if(!isVarEmpty(wa.userLoginDate)) 		{ userLoginData[2]=wa.userLoginDate; 			} 	else { userLoginData[2]=""; }	//current date
	if(!isVarEmpty(wa.userLifetimeLogins)) 	{ userLoginData[3]=wa.userLifetimeLogins; 		} 	else { userLoginData[3]=""; } 	//total # of logins for user
	if(!isVarEmpty(wa.userFICount)) 		{ userLoginData[4]=wa.userFICount; 				} 	else { userLoginData[4]=""; }  	//total # of active FIs for user
	if(!isVarEmpty(wa.userZip)) 			{ userLoginData[5]=wa.userZip; 					} 	else { userLoginData[5]=""; }  	//user zip code
	if(!isVarEmpty(wa.userState)) 			{ userLoginData[6]=wa.userState.toLowerCase(); 	} 	else { userLoginData[6]=""; }  	//user state
	if(!isVarEmpty(wa.userGender)) 			{ userLoginData[7]=wa.userGender.toLowerCase(); } 	else { userLoginData[7]=""; }  	//user gender
	if(!isVarEmpty(wa.userAgeRange)) 		{ userLoginData[8]=wa.userAgeRange.toLowerCase();} 	else { userLoginData[8]=""; }  	//user age range
	if(wa.userFICount>0) { wa.userRUorAU='au'; } else { wa.userRUorAU='ru'; }	//if 1 or more active FI, treat as active user (au)
	if(!isVarEmpty(wa.userRUorAU)) 			{ userLoginData[9]=wa.userRUorAU; 				} 	else { userLoginData[9]=""; }  	//denotes au or ru
	if(!isVarEmpty(wa.userCreditScore)) 	{ //user credit score range
		wa.userCreditScore=wa.userCreditScore.toLowerCase(); 

		//encode credit score prior to storing
		if(wa.userCreditScore.indexOf("excellent")>-1)			{ wa.userCreditScore="cs1"; }
		if(wa.userCreditScore.indexOf("good")>-1) 				{ wa.userCreditScore="cs2"; }
		if(wa.userCreditScore.indexOf("average")>-1)			{ wa.userCreditScore="cs3"; }
		if(wa.userCreditScore.indexOf("poor")>-1) 				{ wa.userCreditScore="cs4"; }
		if(wa.userCreditScore.indexOf("limited or none")>-1)	{ wa.userCreditScore="cs5"; }

		userLoginData[10]=wa.userCreditScore;
	} else { 
		userLoginData[10]="";
	}
	if(!isVarEmpty(wa.userLastRefreshFICount)) 	{ userLoginData[11]=wa.userLastRefreshFICount; 		} 	else { userLoginData[11]=""; } //count of FIs successfully updated since 24 hrs before last user login date
	if(!isVarEmpty(wa.userGuid)) 			{ userLoginData[12]=wa.userGuid; 				} 	else { userLoginData[12]=""; } 	//user GUID
	if(!isVarEmpty(wa.userMobilePlatform))	{ userLoginData[13]=wa.userMobilePlatform;		}	else { userLoginData[13]=""; }	//mobile platform (android, iphone, etc)
	if(!isVarEmpty(wa.userCountry))			{ userLoginData[14]=wa.userCountry.toLowerCase(); }	else { userLoginData[14]=""; }	//country - as selected by user on signup 
	
	setCookie("wa_login",userLoginData,1825); //5 year expiration

	//set "login - all app pages" event
	s.events?s.events=s.events+",event1":s.events="event1"; //if events exist, append event1; otherwise just event1
	
	if(wa.userFICount>0) {
		//s.events?s.events=s.events+",event8,event9:"+wa.userGuid:s.events="event8,event9:"+wa.userGuid; //if events exist, append 8/9, otherwise just 8/9
	}
}
waGetUserLoginData(); //retrieve user login values from cookie

if(wa.defaultSiteGroup!="app") {
	if ("undefined"==typeof(Mint)) { //Mint object does not exist outside of product; create if not present
		Mint={};
		Mint.POI="";
		Mint.POI.context="";
		$M=Mint;
	}
}

// Sneak Preview / Bill Reminders features;  Uses Mint.POI API to listen for the specified events...
if(Mint && Mint.POI.sneakPreviewLandingPageEvent) {
	Mint.POI.sneakPreviewLandingPageEvent.addListener(function(tData,tHref) {
		//sneak preview event has occurred on sneak preview landing page
		//data= 'login now', 'create account', etc
		var waData=tData;
		var waHref=tHref;
		
		if(waHref) {
			waLinkClick(waHref,'sneakpreview','link',waData);
		} else {
			waLinkClick(this,'sneakpreview','link',waData);
		}
	});
}

if($M.POI.sneakPreviewOverviewPageEvent){
	$M.POI.sneakPreviewOverviewPageEvent.addListener(function(tData,tHref) {
		// sneak preview event has occurred on overview page //
		//data{ source:''facebook,  task:' module_preview_reportabug'}, etc	
		var source=tData.source;
		var task=tData.task;
		var waHref=tHref;

		(wa.pageDetail=="advice") ? wa.pageDetail="overview" : wa.pageDetail=wa.pageDetail;
		
		if(waHref) {
			waLinkClick(waHref,'billreminders','link',task);
		} else {
			waLinkClick(this,'billreminders','link',task);
		}
	});
}

wa.billpayOverlayActions=function(pv_location,pv_action) {
    //capture overview page state before making any modifications
    waCaptureContainerVariables('capture');
 
    wa.pageDir="overview";
    wa.pageSubDir="billpay";
    wa.pageDetail=pv_location;
    (pv_action) ? wa.pageDetail=wa.pageDetail+"/"+pv_action : wa.pageDetail=wa.pageDetail;
    (wa.billpayPrice) ? wa.pageDetail=wa.billpayPrice+"/"+wa.pageDetail : wa.pageDetail=wa.pageDetail;
    waSetDefaultVariables();
    s.t(); //send sitecatalyst call
    
    //restore pre-billpay state before making any other calls from overview page
    waCaptureContainerVariables('restore');
}

if($M.POI.billpayOverviewPageEvent) {
    $M.POI.billpayOverviewPageEvent.addListener(function(tData) {
        var location=tData.location;
        var action=tData.action;
        
        wa.billpayOverlayActions(location,action);
    });
}

// BEGIN Build dynamic mboxes for T&T //
	//Welcome page / first user experience (fue)
	if(wa.pageDetail=="fue" || wa.pageDetail=="welcome") {
		var welcomeAddFIUserSegment;
		//append div to body for reference in mboxDefine()
		var waWelcomePageLoadDiv=document.createElement('div');
		waWelcomePageLoadDiv.id='waWelcomePageLoadDiv';
		document.body.appendChild(waWelcomePageLoadDiv);
		
		
		//if new user, build mint-poi_newuser_metrics mbox and send call to t&t
		try {
			if(wa.newCustomer) { 
				//get user segment for test
				(Mint.POI.context.buckets.welcomeStep1AddAccountTest) ? welcomeAddFIUserSegment=Mint.POI.context.buckets.welcomeStep1AddAccountTest : welcomeAddFIUserSegment="";
				//build mbox and send call
				mboxDefine('waWelcomePageLoadDiv','mint-poi_newuser_metrics'); 
				mboxUpdate('mint-poi_newuser_metrics','mintUserSegment='+welcomeAddFIUserSegment);
			}
		} catch(e) { /* ignore */ }
	}
	
// END Build dynamic mboxes for T&T //


/* UTILITY FUNCTIONS */
/* Truncate length of delimited string to specified length (remove from left of string) */
function waSpliceDelimitedString(pv_string,pv_delimiter,pv_length) {
	var pv_string = pv_string.split(pv_delimiter);							//split into array
	if(pv_string.length>pv_length) {										//check length against desired length
		pv_string = pv_string.splice(pv_string.length-pv_length,pv_length);	//remove first X items
	}
	pv_string = pv_string.join(pv_delimiter);								//convert array to string
	return(pv_string);
}
 
 /* Build/Retrieve Cookie for Cross Visit Participation */
 function waCrossVisitParticipation(pv_cookieName,pv_cookieValue,pv_returnLength,pv_delimiter,pv_cookieExpire) {
	var returnLength = pv_returnLength;
	var cookieValue = pv_cookieValue.replace("'","");
	var loopLength, returnValue
	var cookieArray = getCookie(pv_cookieName);

	//look for existing s_cpm cookie and delete, if present...
	var nameOfCookieToDelete = "s_cpm";
	var cookieToDelete = getCookie(nameOfCookieToDelete);
	if(cookieToDelete!=null && cookieToDelete!="") {
		setCookie(nameOfCookieToDelete,'',-1);    //if cookie has value, expire it
	}

	if(cookieValue) {
		if((cookieArray=="none") || (isVarEmpty(cookieArray))){ //does the cookie contain any values?
			newCookieArray=new Array(cookieValue);
			setCookie(pv_cookieName,newCookieArray,pv_cookieExpire);
			return(cookieValue);
		} else {
			cookieArray = cookieArray.split(",");
			var mostRecent = cookieArray[0];
			if(mostRecent==cookieValue) { //is the current pv_cookieValue same as last?
				returnValue=cookieArray.reverse()
				returnValue=cookieArray.join(pv_delimiter);
				return(returnValue);
			} else { 
				cookieArray.unshift(cookieValue);
				if(cookieArray.length>=returnLength) { cookieArray.length=returnLength };
				
				setCookie(pv_cookieName,cookieArray,pv_cookieExpire);
				returnValue=cookieArray.reverse();
				returnValue=cookieArray.join(pv_delimiter);
				return(returnValue);
			}
		}
	}
}
/* Create Cookie */
function setCookie(c_name,value,expiredays) {
    var exdate=new Date();
    var h=window.location.hostname;
	h=h.split('.');h=h.splice(h.length-2,2);//grab lst 2 positions of hostname (ie//"example.com")
	h=h.join('.');
	exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";path=/;expires="+exdate.toGMTString())+";domain="+h;
}	 
/* Get Cookie Values */
function getCookie(c_name) {
	if (document.cookie.length > 0) { 
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length+1;
			c_end = document.cookie.indexOf(";",c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
  return "none"
}

/* Calculate difference between two dates */
function waDaysBetween(pv_date1, pv_date2) {
    var ONE_DAY = 1000 * 60 * 60 * 24  // The number of milliseconds in one day

    var date1_ms = pv_date1.getTime()  // Convert both dates to milliseconds
    var date2_ms = pv_date2.getTime()

	var difference_ms = Math.abs(date1_ms - date2_ms)  // Calculate the difference in milliseconds
   	
	return Math.round(difference_ms/ONE_DAY)  // Convert back to days and return
}

/* Convert date string to YYYYMMDD format */
function waBuildDate(pv_date) {
	var dateString;
    pv_date=new Date(pv_date);
    var fullYear=pv_date.getFullYear().toString();
    var month=pv_date.getMonth()+1; //add 1 to month (othewise, date is 1 month behind)
        month=month.toString();
		if(month.length<2) {month="0"+month;}
    var dayOfMonth=pv_date.getDate().toString();
		if(dayOfMonth.length<2) {dayOfMonth="0"+dayOfMonth;}
    dateString=fullYear+month+dayOfMonth;
	if(isNaN(dateString)) { dateString=""; }
	return(dateString); //concatenate as YYYYMMDD
}

/*
 * This function is used for mousedown events when advancing through div panels, used for IRA pages, function called on page
 */ 
function waPageNameReader(pageName) { 
//	switch(pageName)
//    {
//       case "start":	s.events="event21";break;            
//        case "age":		s.events="event22";break;
//        case "tax":		s.events="event23";break;
//        case "income":	s.events="event24";break;
//        case "final":	s.events="event25";break;
//		default:		s.events="";break;
//   }
//	if(!isVarEmpty(pageName)) { s.pageName=wa.pageDetail+"/"+pageName+" |"+s.prop3; } 
//	s.prop4=wa.tempPageState=s.pageName;
//	s.tl();	
}

/*
 * Define onclick function here to make it easier to use on the page...
 */ 
function waLinkClick(obj,linkName,pv_sSwitchStmt,pv_linkDetail)
{ 
var events;
wa.linkName = false;
    switch(pv_sSwitchStmt)
    {
        case "link":
            switch(linkName)
			{
				case "globalnav":
					wa.linkTrackVars="prop10,prop21,eVar21";
					break;					
		
				//Calendar Widget
				case "calclick":
					wa.linkTrackVars="prop7";
					break;
					
				//Overview
				case "overviewclick":
				case "overlaylink":
					wa.linkTrackVars="prop7";
					break;
				
				//Transaction
				case "transaction":
					wa.linkTrackVars="prop7";
					(wa.events) ? wa.linkTrackVars=wa.linkTrackVars+",events" : wa.linkTrackVars=wa.linkTrackVars;
					events=wa.events;
					s.linkTrackEvents=events;
					s.events=s.linkTrackEvents;
					break;
					
				//Planning
				case "planning": // change to: case "budget"
					wa.linkTrackVars="prop7,events";
					events=wa.events;
					s.linkTrackEvents=events;
					s.events=s.linkTrackEvents;
					break;
					
				//Trend
				case "trend":
					wa.linkTrackVars="prop7,events";
					events=wa.events;
					s.linkTrackEvents=events;
					s.events=s.linkTrackEvents;
					break;
					
				//FIs
				case "addfi":
					wa.linkTrackVars="events";
					events="event11,event10";
					s.linkTrackEvents = events;
					s.events = s.linkTrackEvents+":"+wa.userGuid;
					break;
				case "searchfi":		
					wa.linkTrackVars="events";
					events="event12";
					s.linkTrackEvents = events;
					s.events = s.linkTrackEvents+":"+wa.userGuid;
					break;
				case "sysmsg":				
					wa.linkTrackVars="prop7,events";
					events=wa.events;
					s.linkTrackEvents = events;
					s.events = s.linkTrackEvents;
					if(wa.events) { s.events=s.events+":"+wa.userGuid; }
					break;
				case "closefioverlay":	//REMOVE FOR PHASE2(?)
					wa.linkTrackVars="prop7,events";
					events="event13";
					s.linkTrackEvents = events;
					s.events = s.linkTrackEvents+":"+wa.userGuid;
					break;
				
				//Goals
				case "goalsclick":		
					wa.linkTrackVars="prop7,eVar11";
					break;
				case "upload photo":	
					wa.linkTrackVars="prop11,eVar11,events";
					events=wa.events;
					s.linkTrackEvents = events;
					s.events = s.linkTrackEvents;
					if(wa.goalID) {s.events=s.events+":"+wa.goalID;}
					break;
				case "autosave goal":
					wa.linkTrackVars="prop11,eVar11,events";					
					events=s.linkTrackEvents=wa.events;
					s.events=s.linkTrackEvents;
					if(wa.goalID) {s.events=s.events+":"+wa.goalID;}
					break;
				case "add a goal":
				case "edit goal":
				case "add account":
				case "uncomplete goal":
				case "click add task":
				case "create task":
				case "view task":
				case "edit task":
				case "complete task":
				case "uncheck task":
				case "rate details":
					wa.linkTrackVars="prop11,eVar11";
					break;
				
				//Offers
				case "offerclick":
					wa.linkTrackVars="events,transactionID,products,prop6,eVar6,prop7,eVar11";
					s.linkTrackEvents=s.events;
					break;
				case "offerimpression":
					wa.linkTrackVars="eVar11,events,products";
					s.linkTrackEvents=s.events;
					if(s.events.indexOf('event6')>-1) {
						if(wa.userGuid) {
							s.events=s.events.replace('event6','event6:'+wa.userGuid);
						} else {
							s.events.replace(',event6',''); 
						}
					}
					break;

				//Alerts
				case "alertimpression":
				case "alertclick":
				case "alertdismiss":
					wa.linkTrackVars="events,products";
					if(s.eVar53) { wa.linkTrackVars=wa.linkTrackVars+",eVar53"; }
					s.linkTrackEvents=s.events;
					if(s.events.indexOf('event6')>-1) {
						if(wa.userGuid) {
							s.events=s.events.replace('event6','event6:'+wa.userGuid);
						} else {
							s.events.replace(',event6',''); 
						}
					}
					break;
				
				//Ways to Save (W2S)
				case "waW2SActions":
					wa.linkTrackVars="prop7,events";
					events=wa.events;
					s.linkTrackEvents=events;
					s.events=s.linkTrackEvents;
					break;
					
				//Ways to Invest (W2I)
				case "investmentActions":
					wa.linkTrackVars="prop7,events";
					events=wa.events;
					s.linkTrackEvents=events;
					s.events=s.linkTrackEvents;
					break;				
				
				//Advice
				case "adviceshowdetails":
				case "advicehidedetails":
					wa.linkTrackVars="prop26,";
				case "adviceimpression":
				case "advicelearnmore":
				case "advicenext":
				case "adviceignore":
					if(wa.linkTrackVars) {
						wa.linkTrackVars=wa.linkTrackVars+"prop7,events,products"; 
					} else {
						wa.linkTrackVars="prop7,events,products"; 
					}
					s.linkTrackEvents=events=s.events=wa.events;

					if(s.events.indexOf('event6')>-1) {
						if(wa.userGuid) {
							s.events=s.events.replace('event6','event6:'+wa.userGuid);
						} else {
							s.events.replace(',event6',''); 
						}
					}
					break;
				
				//Google Local
				case "glocal":
					wa.linkTrackVars="prop19";
					break;
				case "glocal-scid":
					wa.linkTrackVars="prop21,eVar21,prop19";
					break;
				default:
					wa.linkTrackVars="prop7";
					if(wa.pageDetail) {	
						//bug fix for "advice" prefix when should be "overview" on bill reminders actions
						(linkName=="billreminders") ? ((wa.pageDetail=="advice")?wa.pageDetail="overview":wa.pageDetail=wa.pageDetail):wa.pageDetail=wa.pageDetail;
						s.prop7=wa.pageDetail; 
					} else { 
						s.prop7=defaultPath; 
					}
					s.prop7=s.prop7+":"+linkName;
					if(pv_linkDetail) { s.prop7=s.prop7+"_"+pv_linkDetail; }
					break;
				}
			//if (stickyCid) {s.prop26= stickyCid+" -- "+wa.pageDetail+"/"+linkName+"|"+s.prop3;}else {s.prop26= wa.pageDetail+"/"+linkName+"|"+s.prop3; }

			if(wa.linkTrackVars) { s.linkTrackVars=s.linkTrackVars+","+wa.linkTrackVars; }

			//s=s_gi(s_account);
			var lt=obj.href!=null?s.lt(obj.href):"";
            if (lt=="") { s.tl(obj,'o',linkName); }
            break;

        case "page":
			if(wa.events) {s.events = wa.events;}
			switch(linkName) {
				case "closeoverlay":	break;
				case "searchfi":
				case "addfi":			
					s.events=s.events+":"+wa.userGuid;break;
			}
			if(wa.goalAppendID) {
				if(wa.goalID) { s.events=s.events+":"+wa.goalID; }
				wa.goalAppendID=false;
			}
			
			s.t();  //send page call
			s.products=""; //reset products variable
			wa.events=s.events="";  //reset events variables
            break;
        default:
            s.pageName = linkName; //used for page tracking
            s.prop6=s.eVar6= "";
            //if (bEventTrack)
                s.events = events;
            s.t();
            break;
    }
}

    //generic click track event listener for use with Mint.POI, calls waLinkClick function
    if($M.POI.genericLinkTrackEvent) {
        $M.POI.genericLinkTrackEvent.addListener(function(o) {
            if(!o.linkNode) { o.linkNode = true; } //will NOT insert 500ms delay
            
            if(o.eventName) { //only send the call if linkName is populated
                waLinkClick(o.linkNode,o.eventName,'link',o.eventDetail);
                //OUTPUT:  s.prop7=[currentPage]:[linkName]_[linkDetail]
            }
        });
    }
    
    //new overview page link tracking, created outside of generic poi event (above) due to CALL SAMPLING requirements (june 2012)
    if($M.POI.genericLinkSampledTrackEvent) {
        $M.POI.genericLinkSampledTrackEvent.addListener(function(o) {
            if(wa.sampleLinkTrack) { //only send calls if user meets sampling requirements
                if(!o.linkNode) { o.linkNode = true; } //will NOT insert 500ms delay

                if(o.eventName) { //only send the call if eventName is populated
                    waLinkClick(o.linkNode,o.eventName,'link',o.eventDetail);
                }
            }
        });
    }

	
	/*
		waPageTrack() - Send page call after s_code file has loaded (on click or any other need)
		- pv_pageName
		- pv_pageDetail
		- pv_event
	*/ 
	waPageTrack=function(pv_pageName, pv_pageDetail, pv_event) {
		if(!isVarEmpty(pv_pageName)) {
			//wa.clearVars(true); //pass pv_exclude=true to prevent c1,c2,c3,v1,v2,v3 from being cleared
			pv_pageName=pv_pageName.toLowerCase();
			
			if(!isVarEmpty(pv_pageDetail)) { 
				pv_pageName=pv_pageName+"/"+pv_pageDetail.toLowerCase();
			}
			if(!isVarEmpty(pv_event)) { //pass any events, if present;
				s.events=pv_event;
			}

			wa.pageDetail=pv_pageName;
			s.prop3 ? s.pageName=wa.pageDetail+" |"+s.prop3 : s.pageName=wa.pageDetail;
			s.prop26=waBuildPageDetail();
		}
		
		s.t();
		s.events=""; //clear events to prevent sending on next call
	}

	function isVarEmpty(pv_sVar) { //Validate if variable is null, undefined or blank ("")
		if ( (pv_sVar == null) || (typeof(pv_sVar) == "undefined" || (pv_sVar == "")) ) {
			return true;
		} else {
			return false;
		}
	}  

	function locateElementByClassName(elementType,elementName) { 
		var returnValue = ""
		var myElement = document.getElementsByTagName(elementType); 
		
		for( var i = 0; i < myElement.length; i++ ) 
		{ 
			if(myElement[i].className == elementName )
			{
				if(!isVarEmpty(myElement[i].id)){returnValue=myElement[i].id;}
				else{returnValue=myElement[i].className;}
			}
		}
		return(returnValue)
	}	

/* Attach onClick event to elements (specified by ID) on the page specified */
function addOnClickToElementById(elementID,pageName){
	if(wa.tempPageDetail==pageName)
	{
		elementID = document.getElementById(elementID);
		elementID.onclick = element_click;
	}
}

/* Function to determine which LI element was clicked */
function obj_id (event) {
	var targ;
	if (!event) var event = window.event;
	if (event.target) targ = event.target;
	else if (event.srcElement) targ = event.srcElement;
	if (targ.nodeType == 3) //fix for Safari bug
		targ = targ.parentNode;
    var obj;
    obj = targ;
    return obj;
}

/* Get's executed when an element is clicked */
function element_click(event){
 //Retrieve element that was clicked.
	var obj = obj_id(event);
    s.linkTrackVars = s.linkTrackVars+",prop6,eVar6,prop7,events";

	switch(wa.tempPageDetail) {
		case "login":
			if(wa.pageState=="signup") { 
				wa.pageState="login"; 
				s.events=""; 
				try {
					if(wa.createMbox){
						mboxDefine('offermatica-div','mint_loginform_metrics');
						wa.createMbox=false;
					}
					mboxUpdate('mint_loginform_metrics');
				}
				catch(err){
					/* ignore error */
				}
			}
			else {
				wa.pageState="signup"; 
				s.events="event2"; 
				try {
					if(wa.createMbox){
						mboxDefine('offermatica-div','mint_signupform_metrics');
						wa.createMbox=false;
					}
					mboxUpdate('mint_signupform_metrics');
				}
				catch(err){
					/* ignore error */
				}
			}
			break;
		case "preview":
			break;
	}
	s.pageName=wa.tempPageDetail+"/"+wa.pageState+" |" + s.prop3;
	s.prop4=s.pageName;
	s.t();
}
	
	/* Calculates and returns a string representing the date based upon the client machine's date calculated
	 * to a standard offset representing PT.
	 */
	function calculateDate() {
		var REPORTING_OFFSET = "-8";
		// create Date object for current location
		clientDate = new Date();
		// convert to milliseconds and add local timezone offset to get UTC time in milliseconds
		utcDate = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
		// create new Date object accounting for offset
		serverDate = new Date(utcDate + (3600000*(REPORTING_OFFSET)));
		// return time as a string
		return(serverDate.getFullYear() + "|" + (serverDate.getMonth()+1) + "|" + serverDate.getDate());
	 }
     
/* GOALS */
//Scope:  Overview page
function waOverviewActions(pv_action,pv_details,pv_linkDestination,pv_ttSku,pv_linkObj) {
	//pv_ttSku=TurboTax SKU
	if(pv_action) { pv_action=pv_action.toLowerCase(); }
	if(pv_details) { pv_details=pv_details.toLowerCase(); }
	if(pv_linkDestination)  { pv_linkDestination=pv_linkDestination.toLowerCase(); }
	if(pv_ttSku) { pv_ttSku=pv_ttSku.toLowerCase(); }

	switch(pv_action) {
		case "w2sclick":
		case "goalsclick":
		case "overlaylink":
			s.prop7="overview:"+pv_details;
			break;
        case "ty11":
			s.prop7="overview:"+pv_action+"widget_"+pv_details;	
			if(pv_linkDestination) {
				s.prop7=s.prop7+"_"+pv_linkDestination;
				if(pv_details=="file tt") { //custom logic for "file with turbotax" tab
					if(pv_linkDestination=="get started" || pv_linkDestination=="learn more") { //append pv_ttSku for clicks on "get started" and "learn more" links
						if(pv_ttSku) { s.prop7=s.prop7+"_"+pv_ttSku; } else { s.prop7=s.prop7+"_sku not specified"; } //append pv_ttSku
					}
				}
				if(pv_linkDestination!="finished" && pv_linkDestination!="taxcaster_lnk" && pv_linkDestination!="taxcaster_btn" && pv_linkDestination!="get started" && pv_linkDestination!="learn more") {
					s.prop21="mint_overview_ty11widget_"+pv_details+"_"+pv_linkDestination;
					if(!isVarEmpty(s.prop21)) { //if prop21 is populated, populate eVar21 and include in linkTrackVars
						s.eVar21="D=c21";
						s.linkTrackVars=s.linkTrackVars+",prop21,eVar21";
					}
				}
			}
			break;			
		default:
			s.prop7="overview:"+pv_action;
			if(!isVarEmpty(pv_details)) { s.prop7=s.prop7+"_"+pv_details; }
			break;
	}
	s.usePlugins=false; //disable do_plugins to prevent c/v21 from being overwritten
	if(pv_linkObj) {
		waLinkClick(pv_linkObj,'overviewclick','link');
	} else {
		waLinkClick(this,'overviewclick','link');
	}
	s.prop7=s.eVar21=s.prop21="";
	s.usePlugins=true;  //re-enable do_plugins
}

try{
	if(Mint.POI.context.overviewPageTourIsVisible) {
		wa.isTourDisplayed=Mint.POI.context.overviewPageTourIsVisible;
	}
} catch(e) { /* ignore */ }

wa.tourTips=function(pv_tourModule,pv_linkDetail,pv_obj) {
	if(pv_tourModule) { pv_tourModule=pv_tourModule.toLowerCase(); }
	
	//overview:tour_[tourModule]_[linkDetail]
	var returnVar=wa.pageDetail+":tour_"+pv_tourModule;
	if(pv_linkDetail) { returnVar=returnVar+"_"+pv_linkDetail.toLowerCase(); }
	
	s.prop7=returnVar;
	s.linkTrackVars=s.linkTrackVars+",prop7";

	if(pv_obj) {
		var lt=pv_obj.href!=null?s.lt(pv_obj.href):"";
		if (lt=="") { s.tl(pv_obj,'o','tourTipsClick'); }
	} else {
		s.tl(true,'o','tourTipsClick');
	}
};

if(Mint.POI.overviewTourClickEvent) {
	Mint.POI.overviewTourClickEvent.addListener(function(module,linkDetail,linkObj) {
		wa.tourTips(module,linkDetail,linkObj);
	});
}

if(!document.getElementById('waDynamicMbox')) {
	if(!document.getElementById('waDynamicMboxDiv')) {
		wa.domAddDivOfferClick=document.createElement('div');
		wa.domAddDivOfferClick.id='waDynamicMboxDiv';
		wa.domAddDivOfferClick.style.display="none";
		document.body.appendChild(wa.domAddDivOfferClick);
	}
}


//Scope:  Offer Impressions and Clicks
function waOfferTracking(pv_action,pv_offerIDs,pv_clickValue,pv_offerSource,pv_campaign,pv_displayModule) {
	pv_action="offer"+pv_action;
	if(!pv_offerIDs) {pv_offerIDs=wa.offerIDs;}

	switch(pv_action) {
		case "offerimpression":			
			if(pv_offerIDs.length>1) {
				s.products=pv_offerIDs;
				if(pv_displayModule=='advice') {
					var advicePage=waBuildAdvicePage();
					if(wa.adviceIDs) { s.products=s.products+',;adv_'+advicePage+'_'+wa.adviceIDs; }
				}
				
				
				if(wa.pageDir+"/"+wa.pageDetail=="goal/get started" || wa.pageDir+"/"+wa.pageDetail=="goal/goals set") {
					if(isVarEmpty(wa.pageOverlay)) { wa.offerResetProducts=true; } //trigger to reset s.products in waGoalActions() on 'pagecall' after initial page load
				}
				if(wa.trackImpressions) {
					if(s.events) {
						if(s.events.indexOf('event6')>-1){
							if(s.events.indexOf('event6:'+wa.userGuid)>-1){
								s.events=s.events.replace('event6:'+wa.userGuid,'event6');
							}
							wa.events=s.events=s.events+",prodview,event30";
						}
					} else {
						wa.events=s.events="prodview,event30";
					}
					waLinkClick(this,pv_action,'link');
					wa.events=s.events="";
				}
				//prepare mint_offerclick_metrics for use on offerClick
				if(!wa.offerClickMboxDefined) {
					mboxDefine('waDynamicMboxDiv','mint_offerclick_metrics','mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9,'mintLifetimeLogins='+s.eVar10);
					wa.offerClickMboxDefined=true;
				}
			}
			break;
		case "offerclick":		
			//when 'new' method of tracking offer clicks is rolled out, ENALBE this code
				//s.transactionID=clickID; (?) - Required for use with data sources integration (general) upload type

			//remove ';' from offer id (began appearing in calls after 7/8/2010 release)
			if(pv_offerIDs.indexOf(';')>-1) { pv_offerIDs=pv_offerIDs.replace(';',''); } 
				
			wa.noCall=true;//do NOT let waOfferClick make s.tl() call		
				waOfferClick(this,pv_offerIDs,pv_offerSource,pv_campaign,pv_displayModule);
			wa.noCall=false;//reset
		
			s.products=";"+pv_offerIDs+";1";

			if(pv_displayModule=='advice') {
				var advicePage=waBuildAdvicePage();
				if(wa.adviceIDs) { s.products=s.products+',;adv_'+advicePage+'_'+wa.adviceIDs+';1'; }  //also include advice id if offer is displayed as part of advice
			}

			wa.events="event28,event29"; 
			s.events=wa.events;
			
			if(wa.offerClickMboxDefined) { //also called in waOfferClick()
				mboxUpdate('mint_offerclick_metrics','mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9,'mintLifetimeLogins='+s.eVar10,'mintOfferId='+pv_offerIDs);
			}
				
			if(pv_clickValue) { 
				s.products=s.products+";"+pv_clickValue+";event32="+pv_clickValue; 
				s.events=s.events+",event32";
			}

			//append events if offer is clicked on ira results page
			if(pv_displayModule=='ira') {
				wa.events=s.events=s.events+",event26,event27";
					//event26=IRA Offer Once per Session
					//event27=IRA Offer Click
				//send dynamic mbox call here:  mint_ira_offerclick_metrics
				//wa.fireMbox('waDynamicMbox','mint_ira_offerclick_metrics');
			}
				
			waLinkClick(this,pv_action,'link');
			
			//clear variables...
			s.products="";
			wa.events=s.events="";
			s.prop6=s.eVar6="";
			s.transactionID="";
			break;
		default:
			s.products="";
			wa.events=s.events="";
			break;
	}
	s.products="";
}

function waOfferClick(obj,offerId,offerSource,campaign,displayModule)
{
	//remove ';' from offer click id (began appearing in calls after 7/8/2010 release)
	if(offerId.indexOf(';')>-1) { offerId=offerId.replace(';',''); } 
			
    switch(wa.pageDetail) {		
		case "ira":
			break;
			
		default:	
			if(!wa.noCall) { //if waOfferTracking function initiates the call, let it build these vars
				s.linkTrackVars = s.linkTrackVars+",prop6,eVar6,prop7,eVar11,events";
				s.linkTrackEvents = "event28,event29";
				s.events="event28,event29";

				if(wa.offerClickMboxDefined) { //also called in waOfferTracking()
					mboxUpdate('mint_offerclick_metrics','mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9,'mintLifetimeLogins='+s.eVar10,'mintOfferId='+pv_offerIDs);
				}
			}
			
			offerId=offerId.toLowerCase();
			offerSource=offerSource.toLowerCase();
			if(!isVarEmpty(campaign)) { campaign=campaign.toLowerCase(); }
			
			if(wa.pageDetail) {
				if(wa.pageDetail=="results" && wa.pageDir=="ira") { //use "ira" as prefix instead of "results"
					s.prop6=wa.pageDir+"_"+offerId+"_"+offerSource;
				} else {
					s.prop6=wa.pageDetail+"_"+offerId+"_"+offerSource;
				}
			} else {
				s.prop6=defaultPath+"_"+offerId+"_"+offerSource;
			}
			s.prop6=s.prop6+"_";
			if(!isVarEmpty(campaign)){s.prop6=s.prop6+campaign;}
			
			s.prop6=s.prop6+"_";
			if(!isVarEmpty(displayModule)){s.prop6=s.prop6+displayModule;}
			s.eVar6="D=c6";
			break;		
	}	
	if(!wa.noCall) { //if waOfferTracking initiates the call, let it make the s.tl() call
		s=s_gi(s_account);
		var lt=obj.href!=null?s.lt(obj.href):""; 
		if (lt=="") { s.tl(obj,'o',wa.pageDetail); }
		//clear vars...
		s.events="";
		s.prop6=s.eVar6="";
	}
}

//Scope:  Goals
function waGoalActions(pv_action,pv_goalAmount,pv_goalAccount,pv_goalDate) {
	var strPrefix="";
	
	if(!wa.containerPageName) {	waCaptureContainerVariables("capture"); }
	
	if(wa.pageDir) { s.prop4=wa.pageDir; } else { s.prop4=wa.pageDetail; }
	s.prop4=s.prop4+" |"+s.prop3;if(!isVarEmpty(s.prop4)) {s.eVar4="D=c4";}
	
	if(!isVarEmpty(wa.goalType)) { s.eVar11=wa.goalType.toLowerCase(); }
	
	waBuildGoalsPageNames();
	
	//Track behavior-specific actions...
	switch(pv_action) {
		case "upload photo":		//user successfully uploads a photo/image to a goal
			s.prop11=strPrefix+pv_action;
			wa.events="event50";  //Goal Photo Upload
			waLinkClick(this,pv_action,'link');
			wa.events=s.prop11="";
			break;
		
		//goal-specific actions:
		case "add a goal":  
		case "edit goal":  
		case "add account":  
		case "uncomplete goal":
			switch(wa.pageOverlay) {
				case "":  
				case "step1":  
				case "step2":
				case "step3":  
				case "step4":
					break;
			}
			s.prop11=strPrefix+pv_action;
			waLinkClick(this,pv_action,'link');
			wa.restoreGoalDetails=true; //used to ensure correct page name when overlay is closed
			s.prop11="";
			break;
		case "autosave goal":  
			s.prop11=strPrefix+pv_action;
				if(pv_goalAccount) s.prop11=s.prop11?s.prop11+"_"+pv_goalAccount:pv_goalAccount;
				if(pv_goalAmount) s.prop11=s.prop11?s.prop11+"_"+pv_goalAmount:pv_goalAmount;
				if(pv_goalDate) s.prop11=s.prop11?s.prop11+"_"+pv_goalDate:pv_goalDate;
			wa.events="event56";  //Goal Created
			if(wa.pageOverlay) { wa.pageOverlay=wa.pageOverlay+"/save goal"; } else { wa.pageOverlay=wa.pageOverlay+"save goal"; }
			if(wa.goalID) {wa.events=wa.events+":"+wa.goalID;}
			waLinkClick(this,pv_action,'link');
			wa.events=s.events=s.prop11="";
			break;
		case "save goal":
			s.prop11=strPrefix+pv_action;
				if(pv_goalAccount) s.prop11=s.prop11?s.prop11+"_"+pv_goalAccount:pv_goalAccount;
				if(pv_goalAmount) s.prop11=s.prop11?s.prop11+"_"+pv_goalAmount:pv_goalAmount;
				if(pv_goalDate) s.prop11=s.prop11?s.prop11+"_"+pv_goalDate:pv_goalDate;
			
			if(wa.goalSetupIncomplete=="true") { 
				wa.events="event58";  //event58=Goal Setup Incomplete
				wa.goalSetupIncomplete=""; //reset
			}
			else { wa.events="event56"; } //Goal Created
			
			if(wa.goalID) {wa.events=wa.events+":"+wa.goalID;}
			
			if(wa.pageOverlay) { wa.pageOverlay=wa.pageOverlay+"/save goal"; } else { wa.pageOverlay=wa.pageOverlay+"save goal"; }
			waLinkClick(this,pv_action,'page');
			wa.events="";s.prop11="";
			if(wa.restoreGoalDetails==true) { 
				wa.pageOverlay="goal details";wa.restoreGoalDetails=false;
				waSetDefaultVariables(); //rebuild s.pageName
				waBuildGoalsPageNames();
				waLinkClick(this,pv_action,'page');
			} 
			else { wa.pageOverlay=""; }
			break;
		case "complete goal":		//user successfully marks a goal as "complete"
			s.prop11=strPrefix+pv_action;
			wa.events="event57";  //Goal Marked Complete
			if(wa.goalID) {wa.events=wa.events+":"+wa.goalID;}
			waLinkClick(this,pv_action,'page');
			wa.events="";s.prop11="";
			break;
		case "adjust goals cancel":
		case "adjust goals save":
		case "cancel choose a goal":  //captures red "x" clicks on close of "choose a goal" overlay
		case "cancel goal":	 //captures both red "x" and "cancel" button clicks		
		case "show all goals":  
			s.prop11=strPrefix+pv_action;
			if(wa.restoreGoalDetails==true) { wa.pageOverlay="goal details";wa.restoreGoalDetails=false;} 
				else { wa.pageOverlay="";s.eVar11=""; }
			waCaptureContainerVariables("restore");
			s.pageName=""; //clear s.pageName 
			wa.goalID="";
			waSetDefaultVariables(); //rebuild s.pageName
			waBuildGoalsPageNames();
			waLinkClick(this,pv_action,'page');
			s.prop11="";
			break;
		case "delete goal":
			s.prop11=strPrefix+pv_action;
			waLinkClick(this,pv_action,'page');
			s.prop11="";
			break;
		
		//task-specific actions:	(each of these cases performs the same action...)
		case "create task":			//user successfully creates (and saves) a new task
		case "view task":			//user clicks on an existing task to view it
		case "edit task":			//user successfully edits (and saves) an existing task
		case "complete task":		//user checks the "complete" box for a task
		case "uncheck task":		//user removes checkmark from "complete" box for a task
		case "click add task":		//user clicks the "add a custom task" button
		case "delete task":			//user successfully deletes a task
			waGoalTaskActions(pv_action);
			break;

		case "rate details": //count displays of "rate details" content on step 2 of "Get out of [Credit Card/Loan] Debt" wizard (Goals)
			s.prop11=strPrefix+pv_action;
			if(pv_goalAmount) s.prop11=s.prop11+"_"+pv_goalAmount;  //re-using pv_goalAmount parameter to pass whether "rate details" link was clicked.  Accepted values are "click" and "auto"
			
			//send linkTrack call
			waLinkClick(this,pv_action,'link');
			s.prop11="";
			break;
			
		case "pagecall":
			if(wa.offerResetProducts) {
				s.products="";
				wa.events="";
				wa.offerResetProducts=false;
			}
			switch(wa.pageOverlay) {
				case "step1":	if(wa.events){wa.events=wa.events+",event51";} else {wa.events="event51";}wa.goalAppendID=true;break;
				case "step2":	if(wa.events){wa.events=wa.events+",event52";} else {wa.events="event52";}wa.goalAppendID=true;break;
				case "step3":	if(wa.events){wa.events=wa.events+",event53";} else {wa.events="event53";}wa.goalAppendID=true;break;
				case "step4":	if(wa.events){wa.events=wa.events+",event54";} else {wa.events="event54";}wa.goalAppendID=true;break;
				case "step5":	if(wa.events){wa.events=wa.events+",event55";} else {wa.events="event55";}wa.goalAppendID=true;break;
			}
			
			if(wa.goalPromoRate=="unknown") { 
				s.prop11="promo rate unknown"; //if user answers "i don't know..." to "is this an intro or promo rate?" question in get out of credit card debt goal
				wa.goalPromoRate=""; //reset to prevent sending on next page call
			}
			
			s.prop5=wa.pageDir
			if(wa.pageDetail) { s.prop5=s.prop5+"/"+wa.pageDetail; }
			s.prop5=s.prop5+" |"+s.prop3;
			
			waLinkClick(this,pv_action,'page');  //send page call
			
			s.prop5=s.prop11="";
			wa.events="";
			break;
			
		default:
			break;
	}

}

function waBuildGoalsPageNames() {
	//s.pageName="[wa.pageDir]/[wa.pageDetail]/[wa.pageOverlay] |[s.prop3]"
	if(wa.pageDir) {s.pageName=wa.pageDir};
		if(wa.pageDetail)	{ s.pageName=s.pageName+"/"+wa.pageDetail; }
		if(wa.pageOverlay)	{ s.pageName=s.pageName+"/"+wa.pageOverlay; }
	s.pageName=s.pageName+" |"+s.prop3;
}

function waGoalTaskActions(pv_action) {
	s.prop11=pv_action;
	s.prop11=s.prop11+"_"+wa.goalType;
	s.eVar11=wa.goalType.toLowerCase();

	if(wa.goalActionType=="default") { 
		s.prop11=s.prop11+"_"+wa.goalActionName; 
	} else {
		s.prop11=s.prop11+"_"+wa.goalActionType;
	}
	s.prop11=s.prop11.toLowerCase();
	
	waLinkClick(this,pv_action,'link');
	s.prop11="";
}
/* END GOALS */ 

function waGetUserLoginData() {
	wa.userLoginData=getCookie('wa_login');
	if(!isVarEmpty(wa.userLoginData)) { 
		wa.userLoginData=wa.userLoginData.split(','); 
		
		wa.userCreateDate=			wa.userLoginData[0]; //date of account creation
		wa.userLastLogin=			wa.userLoginData[1]; //date of last login
		wa.userLoginDate=			wa.userLoginData[2]; //current date
		wa.userLifetimeLogins=		wa.userLoginData[3]; //total # of logins (lifetime) for user
		wa.userFICount=				wa.userLoginData[4]; //total # of active FIs for user
		s.zip=						wa.userLoginData[5]; //user zip code
		s.state=					wa.userLoginData[6]; //user state
		wa.userGender=				wa.userLoginData[7]; //user gender
		wa.userAgeRange=			wa.userLoginData[8]; //user age range
		wa.userRUorAU=				wa.userLoginData[9]; //denotes ru or au
		wa.userCreditScore=			wa.userLoginData[10];//user credit score range
		wa.userLastRefreshFICount=	wa.userLoginData[11];//count of FIs successfully updated since 24 hrs before last user login date
		wa.userMobilePlatform=		wa.userLoginData[13];//mobile device platform (android, iphone, etc)

		wa.userCountry=				wa.userLoginData[14];//country - as selected by user on signup 

		if(wa.userLifetimeLogins==1) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_new user 1 login'; }
		else if(wa.userLifetimeLogins>1 && wa.userLifetimeLogins<6) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_2 to 5 logins'; }
		else if(wa.userLifetimeLogins>5 && wa.userLifetimeLogins<11) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_6 to 10 logins'; }
		else if(wa.userLifetimeLogins>10 && wa.userLifetimeLogins<21) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_11 to 20 logins'; }
		else if(wa.userLifetimeLogins>20 && wa.userLifetimeLogins<31) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_21 to 30 logins'; }
		else if(wa.userLifetimeLogins>30 && wa.userLifetimeLogins<51) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_31 to 50 logins'; }
		else if(wa.userLifetimeLogins>50 && wa.userLifetimeLogins<101) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_51 to 100 logins'; }
		else if(wa.userLifetimeLogins>100) { wa.userLifetimeLoginGroup=wa.userRUorAU+'_>100 logins'; }
		s.eVar10=wa.userLifetimeLoginGroup;

		//build membership tenure
		wa.userMembershipTenure=(waDaysBetween(new Date(wa.userLoginDate), new Date(wa.userCreateDate)));
		if(!isNaN(wa.userMembershipTenure)) {
			if(wa.userMembershipTenure<1) {wa.userMembershipTenure=wa.userRUorAU+'_new user';}
			else if(wa.userMembershipTenure>0 && wa.userMembershipTenure <31) {wa.userMembershipTenure=wa.userRUorAU+'_1 to 30 days';}
			else if(wa.userMembershipTenure>30 && wa.userMembershipTenure <91) {wa.userMembershipTenure=wa.userRUorAU+'_31 to 90 days';}
			else if(wa.userMembershipTenure>91 && wa.userMembershipTenure <181) {wa.userMembershipTenure=wa.userRUorAU+'_91 to 180 days';}
			else if(wa.userMembershipTenure>180 && wa.userMembershipTenure <366) {wa.userMembershipTenure=wa.userRUorAU+'_181 to 365 days';}
			else if(wa.userMembershipTenure>365) {wa.userMembershipTenure=wa.userRUorAU+'_>365 days';}
			s.eVar9=wa.userMembershipTenure;
		}

		//build days since last login
		if(wa.userLogin=="true") { //only capture on login because current login date that is stored in wa_login cookie does not update except on login
			wa.userDaysSinceLastLogin=(waDaysBetween(new Date(wa.userLastLogin), new Date(wa.userLoginDate)));
			if(!isNaN(wa.userDaysSinceLastLogin)) {
				s.eVar52=wa.userDaysSinceLastLogin+" days";
				if(wa.userDaysSinceLastLogin==1) { s.eVar52=s.eVar52.replace('days','day'); }
			}
		}

		if(!isVarEmpty(s.eVar9)) {
			s.prop9='D=v9+": "+pageName'
		} else {
			s.prop9='D="tenure cookie na: "+pageName';
		}


        if(!isVarEmpty(wa.userCreateDate)) { s.eVar12=waBuildDate(wa.userCreateDate); } //convert date to YYYYMMDD format

		//build gender/age/credit score variable
		s.eVar32='';
		if(!isVarEmpty(wa.userGender))		{ s.eVar32=wa.userGender; }
		s.eVar32=s.eVar32+'_';
        if(!isVarEmpty(wa.userAgeRange))	{ s.eVar32=s.eVar32+wa.userAgeRange.replace('-','to'); }
		s.eVar32=s.eVar32+'_';
		if(!isVarEmpty(wa.userCreditScore) && wa.userCreditScore!=='unknown')	{ s.eVar32=s.eVar32+wa.userCreditScore.replace('-',' to '); }
		if(s.eVar32.length<3) {s.eVar32='';}
		
		//build active fi/refreshed fi/% variable
		s.eVar37="total ";
		if(isVarEmpty(wa.userFICount) && wa.userFICount!==0) { 
			s.eVar37=s.eVar37+'na';  
		} else { 
			if(!isNaN(wa.userFICount)) { s.eVar37=s.eVar37+wa.userFICount; }
			else{s.eVar37=s.eVar37+'na';}
		}
		s.eVar37=s.eVar37+"_refreshed ";
		if(isVarEmpty(wa.userLastRefreshFICount) && wa.userLastRefreshFICount!==0) { 
			s.eVar37=s.eVar37+'na';  
		} else { 
			if(!isNaN(wa.userLastRefreshFICount)) { s.eVar37=s.eVar37+wa.userLastRefreshFICount; }
			else{s.eVar37=s.eVar37+'na';}
		}
		s.eVar37=s.eVar37+"_";
		if(s.eVar37.indexOf('na')>-1) { s.eVar37=s.eVar37+'na%'; }
		else {			
			wa.userFIRefreshPercent=wa.userLastRefreshFICount/wa.userFICount;
			wa.userFIRefreshPercent=Math.round(wa.userFIRefreshPercent*100);
			if(isNaN(wa.userFIRefreshPercent) || wa.userFIRefreshPercent=='Infinity') { wa.userFIRefreshPercent='na'; }		
			s.eVar37=s.eVar37+wa.userFIRefreshPercent+"%";
		}
	
		//pass mobile device platform variable
		if(!isVarEmpty(wa.userMobilePlatform)) { s.eVar7=wa.userMobilePlatform; }
		
		//pass user country
		if(!isVarEmpty(wa.userCountry)) {
			s.eVar60=wa.userCountry;s.prop60="D=v60"; 
			s.eVar61=s.prop3+":"+wa.userCountry; s.prop61="D=v61"; 
		} else {
			s.eVar61=s.prop3+":unspecified"; s.prop61="D=v61"; 
		}
		//if(wa.userRUorAU=='au'){ s.events="event67"; } //set event when user is an "au" on any page of site (mktg/app/etc)
	}
}

//Scope:  Close Account
function waProfileSettings(pv_action,pv_details) {
	if(!wa.containerPageName) {
		//capture/preserve page vars for container page
		waCaptureContainerVariables("capture");
		s.events="";
	}
		if(pv_action) { wa.pageDetail=pv_action; }
		if(pv_details) { wa.pageDetail=wa.pageDetail+"/"+pv_details; }

	waSetDefaultVariables();
	
	switch(pv_action) {		
		case "close account":
		{
			switch(pv_details) {
				case "confirmation":
					s.events="event38:"+wa.userGuid;
					break;	
			}
			break;
		}
	}
		//send page call
	waLinkClick(this,pv_action,'page');
	//waCaptureContainerVariables("restore");
}

//Scope:  Accounts / Profile Overlay
function waOverlayAccountsProfile(pv_category,pv_tab) {	
	if(!wa.containerPageName) {
		//capture/preserve page vars for container page
		waCaptureContainerVariables("capture");
		s.events="";
	}

	wa.pageDir=pv_category.toLowerCase();
	if(pv_tab) { wa.pageSubDir=pv_tab.toLowerCase(); }	
	
	s.pageName=wa.pageDir;
	if(wa.pageSubDir) { s.pageName=s.pageName+"/"+wa.pageSubDir; }
	s.pageName=s.pageName+" |"+s.prop3;
	
	s.prop4=wa.pageDir+" |"+s.prop3;
	
	s.prop5=wa.pageDir;	
		if(wa.pageSubDir) { s.prop5=s.prop5+"/"+wa.pageSubDir;	}
		s.prop5=s.prop5+" |"+s.prop3;

	//restore page vars for container page
	if(pv_category=="closeoverlay") {
		waCaptureContainerVariables("restore");
		s.pageName=""; //clear s.pageName 
		waSetDefaultVariables(); //rebuild s.pageName
		s.prop5="";
		//s.prop6=pv_category;if(!isVarEmpty(s.prop6)){s.eVar6="D=c6";}
		//wa.events="event13";
	}
	
	//send page call
	waLinkClick(this,pv_category,'page');
}

//Preserve page vars for container page for re-use when overlay is closed
function waCaptureContainerVariables(pv_action) {
	switch(pv_action) {
		case "capture":
			wa.containerPageName=s.pageName;
			wa.containerPageDir=wa.pageDir;
			wa.containerPageSubDir=wa.pageSubDir;
			wa.containerPageDetail=wa.pageDetail;
			wa.containerProp26=s.prop26;
			break;
		case "restore":
			wa.pageDir=wa.containerPageDir;
			wa.pageSubDir=wa.containerPageSubDir;
			wa.pageDetail=wa.containerPageDetail;
			s.prop26=wa.containerProp26;
						
			wa.containerPageName="";
			wa.containerPageDir="";
			wa.containerPageSubDir="";
			wa.containerPageDetail="";
			wa.containerProp26="";
			
			s.pageName=""; //clear s.pageName 
			waSetDefaultVariables(); //rebuild variables
			break;
	}
}

//Scope:  Global Navigation
function waGlobalNav(pv_location,pv_sectionHeader,pv_linkText,pv_queryParam,pv_creative,pv_pageNameOverride,pv_linkObj) {
	s.prop10=pv_location.toLowerCase();
	if(pv_sectionHeader) { s.prop10=s.prop10+"_"+pv_sectionHeader.toLowerCase(); }
	if(pv_linkText) { s.prop10=s.prop10+"_"+pv_linkText.toLowerCase(); }
	s.prop10=s.prop10+" |"+s.prop3;

	if(pv_queryParam=="scid") {
		//scid schema:  [site]_[page]_[location on page]_[creative]_[description]
		  //  example:  mint_hp_topnav_textlink_sign up
		var waSCID=wa.siteName;  							//[site]
		if(pv_pageNameOverride) { 							//[page]
			waSCID=waSCID+"_"+pv_pageNameOverride.toLowerCase(); 
		} else {
			if(wa.pageDetail) { waSCID=waSCID+"_"+wa.pageDetail; }  
				else { waSCID=waSCID+"_"+wa.pageDir; }
		}
		if(pv_location) { waSCID=waSCID+"_"+pv_location; }  //[location on page]
		if(pv_creative) { waSCID=waSCID+"_"+pv_creative; }  //[creative]
		if(pv_linkText) { waSCID=waSCID+"_"+pv_linkText; }  //[description]

		s.prop21=waSCID;
		if(!isVarEmpty(s.prop21)) { s.eVar21="D=c21"; }
	}
	s.usePlugins=false; //disable do_plugins to prevent c21 from being overwritten
	if(pv_linkObj) {
		waLinkClick(pv_linkObj,'globalnav','link');
	} else {
		waLinkClick(true,'globalnav','link');
	}
	s.prop10=s.eVar21=s.prop21="";
	s.usePlugins=true;  //re-enable do_plugins
}

//Scope:  Transactions Page
function waTransactionActions(pv_action,pv_details) {
	var callType="link"; //used in call to waLinkClick function

	switch(pv_action) {
		case "add": case "edit":
			switch(pv_details) {
				case "cancel": case "im done": case "delete":
					waCaptureContainerVariables("restore");
					s.pageName=""; //clear s.pageName 
					waSetDefaultVariables(); //rebuild s.pageName
					waTransactionBuildPageName(pv_details);
					callType="page";
					wa.transPageCallAlreadyMade=false;
					wa.transTempPageNumber="";
					break;
				default:
					waCaptureContainerVariables("capture");
					s.pageName=wa.pageDetail;
					s.pageName=s.pageName+"/"+pv_action;
					s.pageName=s.pageName+" |"+s.prop3;

					callType="page";
					wa.transPageCallAlreadyMade=false;
					wa.transTempPageNumber="";
					break;
			}

			s.prop7="trans:"+pv_action;
			if(pv_details=="im done") {
				if(wa.manualTransactionType) { 
					s.prop7=s.prop7+"_type:"+wa.manualTransactionType.toLowerCase(); 
					wa.manualTransactionType="";
				}
			}
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details.toLowerCase(); }
			
			break;
		case "pagecall":
			waTransactionBuildPageName(pv_details);
			callType="page";

			break;
		default:
			if(pv_action=="category" || pv_action=="recategorize"){ //pass event for re-categorizating txns
				s.prop7="trans:"+pv_action;
			} else {
			
				if(pv_details) {
					s.prop7="trans:"+pv_action+"_"+pv_details.toLowerCase();
				} else {
					s.prop7="trans:"+pv_action.toLowerCase();
				}
			}
			break;
	}
	
	if(wa.transPageCallAlreadyMade && wa.pageNumber==wa.transTempPageNumber){
		if(callType!="page") {
			waLinkClick(this,"transaction",callType); //send page call
			s.prop7="";	
			wa.events=s.events="";
		}
		/* do nothing */
		/* 
			logic in place to prevent duplicate page calls on load of transaction page 
			wa.transPageCallAlreadyMade and wa.transTempPageNumber set at bottom of doPlugins
				and in logic above (in this function)
		*/
	} else {
		waLinkClick(this,"transaction",callType); //send page call
		s.prop7="";
	}
}

function waTransactionBuildPageName(pv_details) {
	s.pageName=""; //clear out existing page name and rebuild
	
	if(wa.pageDir) s.pageName=wa.pageDir;
	if(wa.pageSubDir) s.pageName=s.pageName?s.pageName+"/"+wa.pageSubDir:wa.pageSubDir;
	if(wa.pageDetail) s.pageName=s.pageName?s.pageName+"/"+wa.pageDetail:wa.pageDetail;
	if(wa.pageNumber>1) { s.pageName=s.pageName+"/page"+wa.pageNumber; } //append page number if > 1
	s.pageName=s.pageName+" |"+s.prop3;
}

//TRANSACTIONS PAGE:  Transaction re-categorization
if($M.POI.txnReCategorizedEvent) {
	$M.POI.txnReCategorizedEvent.addListener(function(action,txnId,currentCategory,newCategory) {
		var waAction=action;
		var waTxnId=txnId;
		var waCurrentCategory=currentCategory;
		var waNewCategory=newCategory;

		if(wa.transactionLastId!=waTxnId) { //prevent sending multiple calls for re-categorization of same txn without changing focus between updates	
			//ONLY track re-categorization of previously uncategorized txns
			if(waCurrentCategory.toLowerCase()=="uncategorized") { 
				wa.transactionLastId=waTxnId;
				
				(waAction=="category") ? s.prop7="trans:recategorized" : s.prop7="trans:recategorized_"+waAction;
				wa.events="event70";
					//event70=Txn Re-Categorized
				s.events=wa.events
				s.linkTrackEvents=wa.events;
				s.linkTrackVars=s.linkTrackVars+",prop7,events";
				s.tl(true,'o','transactionRecategorized');
				//clean up
				s.prop7=wa.events=s.events="";
			}
		}
	});
}

//Scope:  Planning Page
function waPlanningActions(pv_action,pv_details) {
	if(!wa.containerPageName) {
		//capture/preserve page vars for container page
		waCaptureContainerVariables("capture");
		s.events="";
	}
	
	var callType="page";
	var makeCall="true";
	
	wa.pageDir=wa.pageDetail;
	wa.pageSubDir=pv_action.toLowerCase();
	
	if(pv_details) { pv_details=pv_details.toLowerCase(); wa.pageDetail=pv_details;}
	
	switch(pv_action) {
		case "budget": // create budget MUST be a success event
			if(pv_details) {
				switch(pv_details) {
					case "create":	
					case "edit":
						s.pageName=wa.pageDir+"/"+wa.pageSubDir+"/"+wa.pageDetail+" |"+s.prop3;
						s.prop4=wa.pageDir+" |"+s.prop3;
						s.prop5=wa.pageDir;	
						if(wa.pageSubDir) { s.prop5=s.prop5+"/"+wa.pageSubDir;	}
						s.prop5=s.prop5+" |"+s.prop3;
						
						s.prop7="planning:"+pv_action; //change to: "budget"+pv_action;
						if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
						break;
					case "create success": wa.events='event64';  //event64=create budget	dedup=n/a
					case "edit success": 
					case "delete": 
					case "create cancel":
					case "edit cancel":
						s.prop7="planning:"+pv_action; //change to: "budget"+pv_action;
						if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
						waCaptureContainerVariables("restore");
						break;
					case "change amount": //captured once per session
						s.prop7="planning:"+pv_action; //change to: "budget"+pv_action;
						if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
						s.prop7=s.campaign=s.getValOnce(s.prop7,'wa_7p',0);
						if(isVarEmpty(s.prop7)) { makeCall="false"; }
						waCaptureContainerVariables("restore");
						callType="link";
				}
			}
			break;
		case "hiding":
			s.prop7="planning:"+pv_action; //change to: "budget"+pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			callType="link";
			break;
		default:
			s.prop7=wa.pageDir+"_"+pv_details;
	}
	if(makeCall=="true") {
		waLinkClick(this,"planning",callType); //send call --- change to waLinkClick(this,"budget",callType);
	}
	s.prop5=s.prop7="";
}

//Scope:  Ways to Save (W2S or WTS) Page(s)
function waW2SActions(pv_action,pv_details) {
	var callType="link";
	if(!isVarEmpty(pv_action)) { pv_action=pv_action.toLowerCase(); }
	if(!isVarEmpty(pv_details)) { pv_details=pv_details.toLowerCase(); }
	
	switch(pv_action) {
		case "w2s_lifewizard":
			s.prop7=pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			wa.events="event61";
			break;
		default:
			s.prop7=pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			break;
	}
	
	waLinkClick(this,'waW2SActions',callType);
	s.prop7="";
	wa.events="";
}

//Life Insurance Wizard
//get user segment from Mint.POI, if available, otherwise simply pass as "na"
try{
	if($M.POI.context.buckets.lifeInsurance) {
		wa.w2sLifeUserSegment = $M.POI.context.buckets.lifeInsurance; 
	} 
} catch(e) { /* ignore */ }

(wa.w2sLifeUserSegment) ? wa.w2sLifeUserSegment=wa.w2sLifeUserSegment : wa.w2sLifeUserSegment="na";

if(wa.w2sLifeUserSegment!=1) {
	wa.w2sLifeQuizStart='age';	//use as trigger in do_plugins to update prop26 on page load
	//update page detail on display of "age" question
	if($M.POI.lifeQuizDisplayQuestionAgeEvent) {
		$M.POI.lifeQuizDisplayQuestionAgeEvent.addListener(function() {
			s.usePlugins=false;
			if(wa.pageDir=="life-insurance") {
				s.prop26=waBuildPageDetail('save/life/wizard/age');
				if(s.prop26.indexOf('life-insurance//')>-1) {s.prop26=s.prop26.replace('life-insurance//','');}
			} else {
				s.prop26=waBuildPageDetail('life/wizard/age');
			}
			s.tl(true,'o','w2s_lifewizard');
			s.usePlugins=true;
		});
	} 

	//update page detail on display of "income" question
	if($M.POI.lifeQuizDisplayQuestionIncomeEvent) {
		$M.POI.lifeQuizDisplayQuestionIncomeEvent.addListener(function() {			
			s.usePlugins=false;
			if(wa.pageDir=="life-insurance") {
				s.prop26=waBuildPageDetail('save/life/wizard/income');
				if(s.prop26.indexOf('life-insurance//')>-1) {s.prop26=s.prop26.replace('life-insurance//','');}
			} else {
				s.prop26=waBuildPageDetail('life/wizard/income');
			}
			s.tl(true,'o','w2s_lifewizard');
			s.usePlugins=true;
		});
	}

	//update page detail on display of "home" question
	if($M.POI.lifeQuizDisplayQuestionOwnHomeEvent) {
		$M.POI.lifeQuizDisplayQuestionOwnHomeEvent.addListener(function() {
			s.usePlugins=false;
			if(wa.pageDir=="life-insurance") {
				s.prop26=waBuildPageDetail('save/life/wizard/own a home');
				if(s.prop26.indexOf('life-insurance//')>-1) {s.prop26=s.prop26.replace('life-insurance//','');}
			} else {
				s.prop26=waBuildPageDetail('life/wizard/own a home');
			}
			s.tl(true,'o','w2s_lifewizard');
			s.usePlugins=true;
		});
	}
	
	//update page detail on display of "dependents" question
	if($M.POI.lifeQuizDisplayQuestionHasDependentsEvent) {
		$M.POI.lifeQuizDisplayQuestionHasDependentsEvent.addListener(function() {
			s.usePlugins=false;
			if(wa.pageDir=="life-insurance") {
				s.prop26=waBuildPageDetail('save/life/wizard/dependents');
				if(s.prop26.indexOf('life-insurance//')>-1) {s.prop26=s.prop26.replace('life-insurance//','');}
			} else {
				s.prop26=waBuildPageDetail('life/wizard/dependents');
			}
			s.tl(true,'o','w2s_lifewizard');
			s.usePlugins=true;
		});
	}

	//update page detail on display of "results" question, also send success event 61
	if($M.POI.lifeQuizDisplayResultsEvent) {
		$M.POI.lifeQuizDisplayResultsEvent.addListener(function() {
			s.usePlugins=false;
			if(wa.pageDir=="life-insurance") {
				s.prop26=waBuildPageDetail('save/life/wizard/results');
				if(s.prop26.indexOf('life-insurance//')>-1) {s.prop26=s.prop26.replace('life-insurance//','');}
			} else {
				s.prop26=waBuildPageDetail('life/wizard/results');
			}
			waW2SActions('w2s_lifewizard','complete');
			s.events="";
			s.usePlugins=true;
		});
	}
}

wa.investmentActions=function(pv_obj,pv_action,pv_details) {
	waInvestmentActions(pv_action,pv_details,pv_obj);
};

if(Mint.POI.investmentsClickEvent) {
	Mint.POI.investmentsClickEvent.addListener(function(linkObj,section,details) {
		wa.investmentActions(linkObj,section,details);
	});
} 

function waInvestmentActions(pv_action,pv_details,pv_obj) {
	var callType="link";
	var prefix="invest:";
	
	if(!isVarEmpty(pv_action)) { pv_action=pv_action.toLowerCase(); }
	if(!isVarEmpty(pv_details)) { pv_details=pv_details.toLowerCase(); }
	
	switch(pv_action) {
		case "quiz":
			s.prop7=prefix+pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			wa.w2iQuiz="w2i "+pv_details;
			wa.events="event62"; //event62=ways to invest (dedup=visit)
			break;
		default:
			s.prop7=prefix+pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			break;
	}
	
	if(pv_obj) {
		waLinkClick(pv_obj,'investmentActions',callType);
	} else {
		waLinkClick(this,'investmentActions',callType);
	}
	s.prop7="";
	wa.events=s.events="";
	wa.w2iQuiz="";
}


//Scope:  Trends Page
function waTrendActions(pv_action,pv_details) {
	var callType="link";
	wa.pageDir=wa.pageDetail;
	wa.pageSubDir=pv_action.toLowerCase();
	s.prop5=wa.pageDir+"/"+wa.pageSubDir+" |"+s.prop3;
	
	if(pv_details) { pv_details=pv_details.toLowerCase(); }
	switch(pv_action) {
		case "graph":
			if(pv_details) { 
				s.pageName=wa.pageDir+"/"+wa.pageSubDir+"/"+pv_details+" |"+s.prop3;
			} else {
				s.pageName=wa.pageDir+"/"+wa.pageSubDir+" |"+s.prop3;
			}
			s.prop4=wa.pageDir+" |"+s.prop3;
			callType="page";
			break;
		case "hiding":
			s.prop7="trend:"+pv_action;
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			if(!wa.containerPageName) {	waCaptureContainerVariables("capture"); }
			callType="link";
			break;
		default:
			s.prop7="trend:"+pv_action
			if(pv_details) { s.prop7=s.prop7+"_"+pv_details; }
			wa.events="event66";	//event66=trends page interaction	(dedup=visit)
			break;
	}
	waLinkClick(this,'trend',callType);
	s.prop7="";
}

wa.trendActions = function(pv_obj,pv_location,pv_category,pv_details) {
	var obj,location,category,details;
	var prefix=wa.pageDetail;
	
	(pv_obj) ? obj=pv_obj : obj=true;
	(pv_location) ? location=pv_location.toLowerCase() : location="";
	(pv_category) ? category=pv_category.toLowerCase() : category="";
	(pv_details) ? details=pv_details.toLowerCase() : details="";
	
	s.prop7=prefix+":"+location+"_"+category+"_"+details;
	
	s.linkTrackVars=s.linkTrackVars+",prop7";
	s.tl(obj,'0','waTrendActions2');
	
	s.linkTrackVars=s.linkTrackVars.replace(",prop7","");
	s.prop7="";
}

if($M.POI.trendClickEvent) {
	$M.POI.trendClickEvent.addListener(function(pv_linkObj,pv_location,pv_action,pv_details) {
		wa.trendActions(pv_linkObj,pv_location,pv_action,pv_details);
	});
}

//TREND Page:  Uncategorized Transactions
//pass event68 if link is to be displayed (fires after page load, therefore requires s.tl call)
if($M.POI.uncategorizedTxnsTrendsPageAvailableEvent) {
	$M.POI.uncategorizedTxnsTrendsPageAvailableEvent.addListener(function() {
		wa.events="event68";
			//event68=Uncat Txn Alert Impression
		s.events=wa.events
		s.linkTrackEvents=wa.events;
		s.linkTrackVars=s.linkTrackVars+",events";
		s.tl(this,'o','trendCategorizeTxnsImpression');	
		wa.events=s.events="";
	});
}

//onclick logic for "categorize" link
if($M.POI.uncategorizedTxnsTrendsPageClickEvent) {
	$M.POI.uncategorizedTxnsTrendsPageClickEvent.addListener(function(linkObject) {
		var waLinkObject=linkObject;
		
		s.eVar53=wa.pageDetail+" page"; //Txn Alert Page (visit/recent)
		wa.events="event69";
			//event69=Uncat Txn Alert Click
		s.events=wa.events
		s.linkTrackEvents=wa.events;
		s.linkTrackVars=s.linkTrackVars+",eVar53,events";
		wa.trendPageUncategorizedTxnClickCallMade=true;
	
		if(waLinkObject) {
			s.tl(waLinkObject,'o','trendCategorizeTxnsClick');
		} else {
			s.tl(this,'o','trendCategorizeTxnsClick');
		}	
	});
}

//reference mint API to capture clicks on social share buttons (facebook, twitter, pinterest) 
    //after successfully creating a new goal
if($M.POI.goalCreatedSocialButtonClickEvent) {
	$M.POI.goalCreatedSocialButtonClickEvent.addListener(function(pv_socialNetwork) {
		var waSocialNetwork=pv_socialNetwork;
		waLinkClick(true,'social share','link',waSocialNetwork);
    });
}

//reference mint API to capture successful FI Add
if(Mint.POI.addFISuccessEvent) {
	Mint.POI.addFISuccessEvent.addListener(function(fiId) {
		waAddFIProcess('sysmsg','success');
	});
} 

//Scope:  Add FI Process
function waAddFIProcess(pv_action,pv_details) {
var callType="page"; //used in call to waLinkClick function
	if(!wa.containerPageName) {	waCaptureContainerVariables("capture"); }

	s.prop7="fi:"+pv_action;
	if(pv_details) { 
		pv_details=pv_details.toLowerCase();
		s.prop7=s.prop7+"_"+pv_details;
	}
	
	//do not change page names if sysmsg
	if(pv_action=="sysmsg") {
		if(pv_details=="success") { 
			wa.events="event37"; 	//send on SUCCESSFUL fi add
			if(!isVarEmpty(wa.userGuid)) { wa.events=wa.events+",event39"; } //event39=add fi 1st time (append wa.userGuid in waLinkClick() before sending call)
		}
		callType="link";
	} 
	else {
		pv_action=pv_action.toLowerCase();
		wa.pageDetail=pv_action;
		waSetDefaultVariables();
		
		switch(pv_action) {
			case "searchfi":		wa.events="event12";break;
			case "selectfi":		break;
			case "addfi":			
				wa.events="event11,event10";  //represents addfi ATTEMPT
				break;
			case "verify identity":	break;
			default:				break;
		}
	}
	
	waLinkClick(this,pv_action,callType);
	wa.events=s.events=s.prop7="";
}

//Scope:  Alert Tracking
function waAlertTracking(pv_action,pv_alertIDs,pv_alertType,pv_alertSubType) {
	pv_action="alert"+pv_action;

	switch(pv_action) {
		case "alertimpression":	
			if(pv_alertIDs.length>0) {
				pv_alertIDs=pv_alertIDs.split(','); 		//break apart array
				for( var i = 0; i < pv_alertIDs.length; i++ ) { 
					pv_alertIDs[i]="alt_"+pv_alertIDs[i]; //prepend "alt_" to differentiate in products list
				}
				pv_alertIDs=pv_alertIDs.join(",;");	 		//re-join the array using ",;" as delimiter
				
				if(wa.trackImpressions) {
					s.products=";"+pv_alertIDs;
					//wa.events="prodview,event35";
						//event35=alert impression
					//if(pv_alertIDs.indexOf('uncategorizedTxn')>-1) { wa.events=wa.events+",event68"; } //event68=Uncat Txn Alert Impression	

					if(s.events) {
						if(s.events.indexOf('event6')>-1){
							if(s.events.indexOf('event6:'+wa.userGuid)>-1){
								s.events=s.events.replace('event6:'+wa.userGuid,'event6');
							}
							wa.events=s.events=s.events+",prodview,event35"; //event35=alert impression
						}
					} else {
						wa.events=s.events="prodview,event35";	//event35=alert impression
					}
					if(pv_alertIDs.indexOf('uncategorizedTxn')>-1) { wa.events=wa.events+",event68"; } //event68=Uncat Txn Alert Impression	

					//s.events=wa.events;
					waLinkClick(this,pv_action,'link');
					s.products="";
					wa.events=s.events="";
				}
				s.eVar53="";//clear out to prevent sending with future calls
			}
			break;
		case "alertclick":		
			s.products=";alt_"+pv_alertIDs+";1";
			wa.events="event36";
				//event36=alert click
			if(pv_alertIDs.indexOf('uncategorizedTxn')>-1){ 
				if(wa.pageDetail=="overview") {
					s.eVar53=wa.pageDetail+" page"; //Txn Alert Page (visit/recent)
					wa.events=wa.events+",event69";
						//event69=Uncat Txn Alert Click
				}
			}
			s.events=wa.events
			waLinkClick(this,pv_action,'link');
			break;
		case "alertdismiss":		
			s.products=";alt_"+pv_alertIDs+";1";
			wa.events="event34";
			//event34=alert dismiss
			s.events=wa.events
			waLinkClick(this,pv_action,'link');
			break;
		default:
			s.products="";
			s.events="";
			break;
	}
}

//SCOPE:  Calendar Widget
function waCalendarActions(pv_action,pv_details) {
	s.prop7=wa.pageDetail+":cal_"+pv_action.toLowerCase();
	if(pv_details) { s.prop7=s.prop7+"_"+pv_details.toLowerCase(); }
	
	waLinkClick(this,'calclick','link');
	s.prop7="";
}

//SCOPE:  Advice 
function waBuildAdvicePage() {
	if(wa.containerPageName) {
		return(wa.containerPageDetail);
	} else {
		return(wa.pageDetail);
	}
}
function waAdviceActions(pv_action,pv_adviceIDs,pv_details) {	
	var advicePage=waBuildAdvicePage();

	var aryAdviceIdsQuantity = new Array();
	var productAdviceIDs; //modified pv_adviceIDs variable for use with s.products string
	
	if(advicePage=='advice') { advicePage=wa.containerPageDetail+'/'+advicePage; }
	
	productAdviceIDs=pv_adviceIDs.split(','); 			//break apart array
	for( var i = 0; i < productAdviceIDs.length; i++ ) { 
		s.prop7=advicePage+':adv_'+productAdviceIDs[i]+'_'+pv_action;
		productAdviceIDs[i]=';adv_'+advicePage+'_'+productAdviceIDs[i];
	}

	productAdviceIDs=productAdviceIDs.join(",;");	//re-join the array using ",;" as delimiter	
	s.products=productAdviceIDs;

	switch(pv_action) {
		case "impression":
			if(wa.trackImpressions) {
				if(s.events) {
					if(s.events.indexOf('event6')>-1){
						if(s.events.indexOf('event6:'+wa.userGuid)>-1){
							s.events=s.events.replace('event6:'+wa.userGuid,'event6');
						}
						wa.events=s.events=s.events+",prodview,event42"; //event42=advice impression
					}
				} else {
					wa.events=s.events="prodview,event42";	//event42=advice impression
				}
			}
			break;
		case "open":		wa.events=s.events="event43";	//event43=advice open
							wa.noCall=true; 				//do not make a call to omniture
			break;
		case "showdetails":	
			//change page detail (c26), but not page name...
			if(!wa.containerPageName) {
			   waCaptureContainerVariables("capture");
			}
			wa.pageDir=wa.containerPageDetail;
			wa.pageDetail='advice';
			wa.adviceIDs=pv_adviceIDs;
			waSetDefaultVariables();
			s.pageName=wa.containerPageName;
			s.prop26=wa.pageDir+'/'+wa.pageDetail+'/'+pv_adviceIDs+' |'+s.prop3;
			wa.events=s.events="event44";	//event44=advice show details (was 'learn more')
			break;
		case "hidedetails":
			//need to reset page detail (c26)...
			waCaptureContainerVariables("restore");
			wa.events=s.events=s.products="";
			break;
		case "next":		wa.events=s.events="event45";	//event45=advice next
			break;
		case "ignore":		wa.events=s.events="event46";	//event46=advice ignore (was 'delete')
			break;
	}

	if(!wa.noCall) {
		if(pv_action=="impression") {
			if(wa.trackImpressions) {
				waLinkClick(this,'advice'+pv_action,'link');
				wa.events=s.events='';
				s.prop7='';		
			} else {
                s.prop7='';
            }
		} else {
			waLinkClick(this,'advice'+pv_action,'link');
			wa.events=s.events='';
			s.prop7='';
		}
		//clear vars...
		s.products='';
	}
	wa.noCall=false; //allow future calls to this function to make s.t or s.tl calls, if appropriate
}

//SCOPE:  W2S Overview Page Widget
	if(wa.pageDetail=='overview') {
	try{
		//get user segment/bucket for use with a/b testing
		wa.w2sOverviewWidgetUserSegment=$M.POI.context.buckets.w2sModulePlacement;
		
		if(!wa.w2sOverviewMboxDefined) {
			/*
				//define mboxes to use with fy12-003 (mint w2s overview module placement test):  test entry (mint_w2s-overview-module_metrics), w2s click (mint_w2s-overview-click_metrics)
				//mboxDefine('waDynamicMboxDiv',
				mboxDefine('waDynamicMbox',
					'mint-poi_w2s-overview-module_metrics',
					'mintUserSegment='+wa.w2sOverviewWidgetUserSegment,
					'mintSiteSection='+s.prop3,
					'mintMembershipTenure='+s.eVar9,
					'mintLifetimeLogins='+s.eVar10,
					'mintGenderAge='+s.eVar32
				);
			*/
				//mboxDefine('waDynamicMboxDiv',
				mboxDefine('waDynamicMbox',
					'mint-poi_w2s-overview-click_metrics',
					'mintUserSegment='+wa.w2sOverviewWidgetUserSegment,
					'mintSiteSection='+s.prop3,
					'mintMembershipTenure='+s.eVar9,
					'mintLifetimeLogins='+s.eVar10,
					'mintGenderAge='+s.eVar32
				);
			/*	
				//send mbox call for entry into fy12-002 (mint w2s overview module placement test)
				mboxUpdate('mint-poi_w2s-overview-module_metrics',
					'mintUserSegment='+wa.w2sOverviewWidgetUserSegment,
					'mintSiteSection='+s.prop3,
					'mintMembershipTenure='+s.eVar9,
					'mintLifetimeLogins='+s.eVar10,
					'mintGenderAge='+s.eVar32
				);
			*/
			wa.w2sOverviewMboxDefined=true; //use to indicate mint-poi_w2s-overview-module-click_metrics mbox has been defined
		}
	} catch(e) { /* ignore error */ }
}

try{
	$M.POI.w2sModuleClickEvent.addListener(function(targ) {
		var waId=targ.id;
		var waNode=targ;

		//strip _# from end of string (w2s_insurance-life_1); added for T39
		waId=waId.substring(0,waId.length-2); 
		
		//send mbox call for click event for fy12-003 (mint w2s overview module placement test)
		if(wa.w2sOverviewMboxDefined) { //make sure the mbox has been defined before calling mboxUpdate
			mboxUpdate('mint-poi_w2s-overview-click_metrics','mintUserSegment='+wa.w2sOverviewWidgetUserSegment,'mintW2SId='+waId,'mintSiteSection='+s.prop3,'mintMembershipTenure='+s.eVar9,'mintLifetimeLogins='+s.eVar10,'mintGenderAge='+s.eVar32);
		}
	
		//waLinkClick(waHref,waId,'link');
		s.prop7=wa.pageDetail+":"+waId;
		s.linkTrackVars=s.linkTrackVars+",prop7";
		s.tl(waNode,'o','w2sModuleClickEvent');
	});
} catch(e) { /* ignore error */ }


//SCOPE:  Public/In-Product Help/Support Pages
try{
	$M.POI.helpClickCategoryEvent.addListener(function(category) {
		var waCategory=category; //basics|bank|features|mobile
		waLinkClick(this,waCategory,'link');
	});
} catch(e) { /* ignore error */ }

try{
	$M.POI.helpClickFAQEvent.addListener(function(category, faqId, action) {
		var waCategory=category; //basics|bank|features|mobile
		var waFaqId=faqId;
		var waAction=action; //expand|collapse
		
		if(waAction=="expand") { waLinkClick(this,waCategory,'link',waFaqId); }
	});
} catch(e) { /* ignore error */ }

try{
	$M.POI.helpSubmitContactForm.addListener(function(pv_obj, topicId, topicTitle) {
		var waTopicId=topicId;
		var waTopicTitle=topicTitle;
						
		if(pv_obj){
			waLinkClick(pv_obj,'contact','link',waTopicId);
		} else {
			waLinkClick(true,'contact','link',waTopicId);
		}
	});
} catch(e) { /* ignore error */ }

/*
	function:  wa.iPadAppDownload
	- Pass-through to wa.appDownloadAttempt function.  wa.appDownloadAttempt was created after
	-	the initial implementation, and is designed to be more flexible, and device agnostic
*/
wa.iPadAppDownload=function(pv_obj,pv_detail){
	wa.appDownloadAttempt(pv_obj,pv_detail,'ipad');
}

/*
	--- take into account android and iphone app download attempt ---
	function:  wa.appDownloadAttempt
	- Send trackLink call for app download attempts (clicks on "get the app") for ipad app
	- 	pf_obj = link object; pass as "this" when called inline via html <a> tag
	-	pv_detail = type of link - (text) link|button|[other?]
	-	pv_appType = which mobile OS?  ipad|iphone|android|[other?]
*/
wa.appDownloadAttempt=function(pv_obj,pv_detail,pv_appType) {
	var obj=pv_obj;
	var waLinkType=pv_detail; 		//link|button
	var waMblAppType=pv_appType;	//android|ipad|iphone
	
	if(waMblAppType) {
		s.eVar62=waMblAppType=waMblAppType.toLowerCase();
	}
	
	if(isVarEmpty(wa.pageDetail)) {
		if(wa.pageDir.indexOf('how-it-works/anywhere')>-1) {
			if(wa.pageDir.indexOf(waMblAppType)>-1) { tempPageDetail=waMblAppType+" lp"; }	//https://stage-www.mint.com/how-it-works/anywhere/[ipad]|[iphone]|[android]
			else { tempPageDetail="anywhere"; }		//top mobile page - https://stage-www.mint.com/how-it-works/anywhere/
		} else {
			if(!isVarEmpty(wa.pageDir)) {
				tempPageDetail=wa.pageDir;
			} else { tempPageDetail=""; }
		}
	} else {
		tempPageDetail=wa.pageDetail;
	}
	
	if(waLinkType) {
		waLinkType=waLinkType.toLowerCase();
		if(waLinkType=="link" || waLinkType=="button") {
			s.prop7=tempPageDetail+":"+waMblAppType+"AppDownload_"+waLinkType;
			
			events="event71"; //71e App Download Attempt
			s.events=s.linkTrackEvents=events;
			s.linkTrackVars=s.linkTrackVars+',prop7,eVar62,events';
		} else {
			s.linkTrackVars=s.linkTrackVars+',prop7';
			s.prop7=tempPageDetail+":"+waLinkType;
		}
	}

	(!obj.href) ? ((obj[0].href) ? obj=obj[0] : obj=obj) : obj=obj;
	
    var lt=obj.href!=null?s.lt(obj.href):""; //make link track call
    if (lt=="") { s.tl(obj,'o','appDownloadAttempt'); }
}

//SCOPE:  Google Local Pages
function waGLocalActions(pv_page,pv_action,pv_details) {
	var strPrefix="";
	var makeCall=true;
	
	if(pv_action) 	{ pv_action=pv_action.toLowerCase(); } else { pv_action=""; }
	if(pv_page) 	{ pv_page=pv_page.toLowerCase(); } else { pv_page=""; }
	if(pv_details) 	{ pv_details=pv_details.toLowerCase(); } else { pv_details=""; }
	if(wa.category) { wa.category=wa.category.toLowerCase(); }
	if(wa.region) 	{ 
		if(wa.region.indexOf('/')==0) {wa.region=wa.region.substr(1);} //remove leading "/", if present
		wa.region=wa.region.toLowerCase();
	}
	if(wa.merchant) { wa.merchant=wa.merchant.toLowerCase(); }
	
	switch(pv_action) {
		case "pageload":
			makeCall=false;
			switch(pv_page) {
				case "cat":		s.prop18=strPrefix+pv_page+":"+wa.category;break;
				case "merch":	s.prop18=strPrefix+pv_page+":"+wa.merchant;break;
				case "reg":		s.prop18=strPrefix+pv_page+":"+wa.region;break;
			}
			break;
		case "signup"://do not break this section; fall into "compare" below...
			s.prop21="glocal_"+pv_page+"_"+pv_details+"_"+pv_action;
			s.eVar21="D=c21";
		case "compare":
			s.prop19=strPrefix+pv_page;
			s.prop19=s.prop19+":"+pv_action;
			s.prop19=s.prop19+"_"+pv_details;
					
			switch(pv_page) {
				case "cat":
					if(!isVarEmpty(wa.category))	{ s.prop19=s.prop19+"_"+wa.category; }
					break;
				case "merch":
					if(!isVarEmpty(wa.merchant))	{ s.prop19=s.prop19+"_"+wa.merchant; }
					break;
				case "reg":
					if(!isVarEmpty(wa.region))		{ s.prop19=s.prop19+"_"+wa.region; }
					break;
				default:
					break;
			}
			break;
		default:
			s.prop19=strPrefix+pv_page;
			s.prop19=s.prop19+":"+pv_action;
			s.prop19=s.prop19+"_"+pv_details;
			break;
	}

	if(makeCall) { //call not made on pageload
		if(pv_action=="signup") { 
			pv_action="glocal-scid"; 		
			s.usePlugins=false; //disable do_plugins to prevent c21 from being overwritten
		} else {
			pv_action="glocal";
		}
		waLinkClick(this,pv_action,'link');
		s.usePlugins=true; //re-enable do_plugins
		s.prop19=s.prop21="";
	}
}

/* Truncate a string, beginning at the location of a specified character or string */
function waTruncateString(pv_string,pv_searchString) {
	var strToRemove
	var bTruncate=false;
	
	if(pv_string.indexOf(pv_searchString) > -1) { bTruncate=true; }

	if(bTruncate){
		strToRemove = pv_string.slice(pv_string.indexOf(pv_searchString))
		pv_string=pv_string.replace(strToRemove,"");	
	}
	return(pv_string);
}

/* END PHASE 2 */


/*
	waSignupTabHandler()
	- Manages page name, s.events and mbox calls for Signup tab of login page
*/
function waSignupTabHandler(){
	wa.pageState="signup";
	s.events="event2";
	try {
		mboxDefine('offermatica-div','mint_signupform_metrics');
		mboxUpdate('mint_signupform_metrics');
		wa.createMbox=true; //if true, call mboxDefine on first click of 'login' tab
	}
	catch(err){
		/* ignore error */
	}
}   

/*
	waLoginTabHandler()
	- Manages page name and mbox calls for Login tab of login page
*/
function waLoginTabHandler(){
	wa.pageState="login";
	if (curl.indexOf("messageid") >-1) {wa.isMsgId="true";}	//capture msg id
	try {
		mboxDefine('offermatica-div','mint_loginform_metrics');
		mboxUpdate('mint_loginform_metrics');
		wa.createMbox=true;//if true, call mboxDefine on first click of 'signup' tab
	}
	catch(err){
		/* ignore error */
	}
}

function waVideoClick(obj,videoName)
{   videoName = videoName.toLowerCase();
    s.prop8 = videoName + " on page " + s.pageName;
    s.eVar8 = "D=c8";
    s.linkTrackVars = s.linkTrackVars+",prop8,eVar8,events";
    s.events = "event14";
    s.linkTrackEvents = s.events;
    s=s_gi(s_account);
    var lt=obj.href!=null&&obj.href!=""?s.lt(obj.href):""; 
    if (lt=="")
        { s.tl(obj,'o',"video started: " + videoName); }
	s.prop8=s.eVar8=s.events=s.linkTrackEvents="";
}

/*
	waGetQueryString()
	- Captures parameter from query string
	- Can be used outside of the doPlugins section
*/
function waGetQueryString(queryParam) {
	fullSubString = window.location.search.substring(1);
	splitSubString = fullSubString.split("&");
	for (i=0;i<splitSubString.length;i++) {
		paramValue = splitSubString[i].split("=");
		if (paramValue[0] == queryParam) {
			return paramValue[1];
		}
	}
}


/* SiteCatalyst code version: H.20.3.
Copyright 1997-2009 Omniture, Inc. More info available at
http://www.omniture.com */
s.doPlugins=s_doPlugins;
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'&&(v!=0)){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*                                                                                        
 * Plugin: s.crossVisitParticipation : 1.2 - stacks values from 
 * specified variable in cookie and returns value                                                   
 */                                                                                                             
s.crossVisitParticipation = new Function("v","cn","ex","ct","dl","ev",""                          
+"var s=this;var ay=s.split(ev,',');for(var u=0;u<ay.length;u++){if(s"                     
+".events&&s.events.indexOf(ay[u])!=-1){s.c_w(cn,'');return '';}}if(!"                     
+"v||v=='')return '';var arry=new Array();var a=new Array();var c=s.c"                     
+"_r(cn);var g=0;var h=new Array();if(c&&c!='') arry=eval(c);var e=ne"                     
+"w Date();e.setFullYear(e.getFullYear()+5);if(arry.length>0&&arry[ar"                     
+"ry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getTime()];el"                     
+"se arry[arry.length]=[v, new Date().getTime()];var data=s.join(arry"                     
+",{delim:',',front:'[',back:']',wrap:'\\''});var start=arry.length-c"                     
+"t < 0?0:arry.length-ct;s.c_w(cn,data,e);for(var x=start;x<arry.leng"                     
+"th;x++){var diff=Math.round(new Date()-new Date(parseInt(arry[x][1]"                     
+")))/86400000;if(diff<ex){h[g]=arry[x][0];a[g++]=arry[x];}}var r=s.j"                     
+"oin(h,{delim:dl});return r;");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="intuitinc"
s.dc=122
s.trackingServer="ci.intuit.com"
s.trackingServerSecure="sci.intuit.com"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}

//var s_code=s.t();if(s_code)document.write(s_code);