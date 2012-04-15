



//Tracking Functions
function sTrackPhotoView(photoName,cleanGalleryTitle) { //Tracks as a Page View
	/* Custom Photo View Implementation Coming Soon */
	s.linkTrackVarsTmp=s.linkTrackVars;
	s.linkTrackVars+=",eVar21,prop43,prop38,";
	s.linkTrackEvents="event22";
	s.events="event22";
	s.eVar21="photo";

	s.prop15 ="gallery";
	s.prop26="scroll:" + photoName;

	s.prop38=cleanGalleryTitle;
	
//if (photoName != null && photoName != "")
	if(sIsPathnameIncluded("/fashion/fashionpolice")){
		photoName="fashion-police:" + photoName;
	}
	if(sIsPathnameIncluded("/movies/photos")){
		photoName="movies:" + photoName;
	}
	if(sIsPathnameIncluded("/gossip/partygirl/pics")){
		photoName="party-girl:" + photoName;
	}
	if(sIsPathnameIncluded("/on/shows/thesoup/photos")){
		photoName="the-soup:" + photoName;
	}
	if(sIsPathnameIncluded("/on/shows/chelsea/galleries")){
		photoName="chelsea:" + photoName;
	}
	s.pageName=photoName;
//else
//	s.pageName = "";

	sSetHeavyPhoto();
	sGetHeavyPhoto("gallery");
	s.eVar43=s.prop43;
	s.t();
	s.linkTrackEvents=s.events=s.eVar21="";
	s.linkTrackVars=s.linkTrackVarsTmp;
}

function sTrackPercentPageViewed(percentSeen){ //tracks as a custom link click
	/*call this function as more of the page is seen via scrolling or browser expanding*/
	//subtract the percent of the page that was already seen from the new total percent of the screen that was seen
	//percentSeenNew = parseFloat(percentSeen) - parseFloat(sGetPercentSeen());
	if (percentSeen > 0){
	//track the difference
	s.linkTrackVarsTmp=s.linkTrackVars;
	s.linkTrackVars+=",prop26,products";
	s.linkTrackEvents="event22";
	s.events="event22";
	s.prop26="scroll:" + s.eVar4;
	s.products=";;;;event22=" + percentSeen;
	s.tl(this,'o','page-percent-seen');
	s.prop26=s.linkTrackEvents=s.events=s.products="";
	s.linkTrackVars=s.linkTrackVarsTmp;
	sSetPercentSeen(percentSeen);
	}

}

function sTrackWidgetClick(widgetLink,searchTerm,host) {
	var wnArray=new Array(3);
	wnArray=widgetLink.split(":");
	if(wnArray[0]) {
		widgetName=wnArray[0];
	}

	s.linkTrackVars=s.linkTrackVars + ",prop18,prop45,eVar23,eVar16,eVar17,prop27,";
	s.linkTrackEvents="event21";
	s.events="event21";
	s.eVar16=widgetName.toLowerCase();
	s.eVar17=s.prop27=widgetLink.toLowerCase();
	s.prop18=host;
	s.eVar23=searchTerm;
	s.tl(document.URL,'o','widget click: ' + widgetLink.toLowerCase());
	s.prop45=s.eVar23=s.eVar16=s.eVar17=s.prop27=s.events="";
	s.linkTrackVars=s.linkTrackVars;
}

function sTrackForm(formName, formEvent, contributeEvent, assetType, formMeta, visitorID) {
	s.linkTrackVars=s.linkTrackVars + ",eVar8,prop5,";
	s.eVar8=formName.toLowerCase();

	if (formEvent=="start"){
		s.linkTrackEvents="event17"
		s.events="event17";
	} else if (formEvent=="complete"){
		s.linkTrackEvents="event18";
		s.events="event18";
	} else {
		s.linkTrackEvents="event17,event18";
		s.events="event17,event18";
	}
	if ((contributeEvent.length)> 0){
		sSetHeavyContributor();
	}
	if ((contributeEvent.length)> 0 && contributeEvent != "distribute"){
	//track real-time contributions
		s.linkTrackVars+=",prop5";
		s.linkTrackEvents+=",event7";
		s.events+=",event7";
		s.prop5=s.eVar4 + ":" + contributeEvent
	} else if(formEvent!="start"){
		s.linkTrackEvents+=",event5";
		s.events+=",event5";
	}
	if ((assetType.length)> 0){
	//track asset uploaded
		s.linkTrackVars+=",eVar21";
		s.eVar21 = assetType;
	}
	if ((formMeta.length)> 0){
		//track meta fields in form
		s.linkTrackVars+=",prop24";
		s.prop24 = formMeta;
	}
	if ((visitorID.length)> 0){
	//track obsfuscated visitor ID On form complete
		s.linkTrackVars+=",eVar25";
		s.eVar25 = visitorID;
	}

	s.tl(document.URL,'o',formName.toLowerCase());
	s.eVar21=s.eVar25=s.prop24=s.linkTrackEvents=s.prop8=s.prop5=s.events="";
	s.linkTrackVars=s.linkTrackVars;
}

function sTrackDownload(downloadName) {
	s.tl(document.URL,'d',downloadName.toLowerCase());
}

function sTrackDistributeInfo() {
	s.linkTrackVars+=",prop45,prop16,eVar16,eVar17,prop27,prop18,eVar5,eVar21,events"
	s.linkTrackEvents="event5";
	s.tl(document.URL,'d',"distribute_" + s.prop16);
	s.linkTrackEvents=s.prop45=s.prop16=s.eVar16=s.eVar17=s.prop27=s.prop18=s.eVar5=s.eVar21=s.events="";
	s.linkTrackVars=s.linkTrackVars;
}


//Setting Functions
function sSetHeavyVideo(videoStarts,secondsViewed) {
	if(secondsViewed){
		sSecondsViewed=parseFloat(sGetVideoViewed())+secondsViewed;
		//video viewing threshold
		if(sSecondsViewed > 300 && sSecondsViewed <= 1800) { //5 mins
			videoThreshold="over-5-mins";
		} else if(sSecondsViewed > 1800) { //30 mins
			videoThreshold="over-30-mins";
		} else {
			videoThreshold="5-mins-or-less";
		}
		s.prop29=s.eVar29=s.getAndPersistValue(videoThreshold,'s_video_threshold',cookieLifetime);
		s.propa=s.getAndPersistValue(sSecondsViewed,'s_video_seconds',cookieLifetime);
	}

	if(videoStarts){
		sVideoStarts=parseFloat(sGetVideoStarts())+videoStarts;
		if (sVideoStarts >= 1 && sVideoStarts <3){
			viewerType="low-video";
		} else if (sVideoStarts >= 1){
			viewerType="high-video";
		} else {
			viewerType="no-video";
		}
		s.propb=s.getAndPersistValue(sVideoStarts,'s_video_starts',cookieLifetime);
		s.prop42=s.eVar42=s.getAndPersistValue(viewerType,'s_video_viewer',cookieLifetime);
	}

}
function sSetHeavyPhoto() {
	//possible values are no-photo,low-photo", or heavy-photo
	numPhotosViewed = getCookie(photoCookieName);
	if(numPhotosViewed == 0)
		s.prop43="no-photo";
	else if(numPhotosViewed < photoHeavyMinimum)
		s.prop43="low-photo";
	else
		s.prop43="high-photo";
	s.prop43=s.getAndPersistValue(s.prop43,'s_photo_viewer',cookieLifetime);
}

function sSetHeavyContributor(viewerType) {
	//possible values are no-contributions,low-contributions, or heavy-contributions
	numContributions = getCookie(contributionCookieName);
	if(numContributions == 0)
		s.prop44="no-contributions";
	else if(numContributions < contributionHeavyMinimum)
		s.prop44="low-contributions";
	else
		s.prop44="high-contributions";
	s.prop44=s.eVar44=s.getAndPersistValue(s.prop44,'s_contributor',cookieLifetime);
}

function sSetPercentSeen(percentSeen) {
	//possible values are 0.25,0.5,0.75,1
	s.perSeen=s.getAndPersistValue(percentSeen,'s_percentseen',0);
}

function sSetWidgetDistributeInfo(widgetLink,widgetSource,assetType,shareTo){
	/* Set Widget Name  based on Widget Link Name*/
	var wnArray=new Array(3);
	wnArray=widgetLink.split(":");
	if(wnArray[0]) {
		widgetName=wnArray[0];
	}
	s.eVar16=s.prop16=widgetName;
	s.eVar17=s.prop27=widgetLink;
	s.prop18=widgetSource;
	s.eVar21=assetType;
	s.eVar5=shareTo;
	s.events="event5" //distribute
}


//Getting Functions
function sGetHeavyVideo() {
	heavyVideo = s.getAndPersistValue(s.prop42,'s_video_viewer',cookieLifetime);
	if(!heavyVideo){
		heavyVideo = "no-video";
	}
	return heavyVideo;
}

function sGetVideoViewed() {
	videoViewed = s.getAndPersistValue(s.propa,'s_video_seconds',cookieLifetime);
	if(!videoViewed){
		videoViewed = 0;
	}
	return videoViewed;
}

function sGetVideoThreshold() {
	videoThreshold = s.getAndPersistValue(s.prop29,'s_video_threshold',cookieLifetime);
	if(!videoThreshold){
		videoThreshold = "5-mins-or-less";
	}
	return videoThreshold;
}

function sGetVideoStarts() {
	videoStarts = s.getAndPersistValue(s.propb,'s_video_starts',cookieLifetime);
	if(!videoStarts){
		videoStarts = 0;
	}
	return videoStarts;
}
function sGetHeavyPhoto(photoView) {
    heavyPhoto = s.getAndPersistValue(s.prop43,'s_photo_viewer',cookieLifetime);
    if(!heavyPhoto && photoView!="gallery") {
        sSetHeavyPhoto("no-photo");
        heavyPhoto = "no-photo";
    } else if(heavyPhoto == "no-photo" && photoView=="gallery"){
        sSetHeavyPhoto("low-photo");
        heavyPhoto = "low-photo";
    }
    return  s.getAndPersistValue(s.prop43,'s_photo_viewer',cookieLifetime);
}


function sGetHeavyContributor() {
	heavyContributor = s.getAndPersistValue(s.prop44,'s_contributor',cookieLifetime);
	if(!heavyContributor) {
		heavyContributor = "no-contributions";
		sSetHeavyContributor("no-contributions");
	}
	return s.getAndPersistValue(s.prop44,'s_contributor',cookieLifetime);

}
function sGetPercentSeen() {
	percentSeen = s.getAndPersistValue(s.perSeen,'s_percentseen',0);
	if(percentSeen == .25){
		percentSeen = 25;
	} else if(percentSeen == .50){
		percentSeen = 50;
	} else if(percentSeen == .75){
		percentSeen = 75;
	} else {
		percentSeen = 100;
	}
	return percentSeen;
}

function sGetYear(){
	var d = new Date();
	return d.getFullYear();
}

//

//return a concatenated comma seperated string of titles based on a css class name

var sTrackingCssNameWidgets = 'sTrackingClassNameWidgets';
var sTrackingCssNameVideos = 'sTrackingClassNameVideos';

function sGetTitlesByCssClass(cssClassName)
{
 var returnElementTitles = "";
 $$(cssClassName).each(function(elmt) {
     if (elmt.title){
         if (returnElementTitles == "")
             returnElementTitles = (elmt.title);
         else
             returnElementTitles += ("," + elmt.title);
     }
 });
	return returnElementTitles;
}

//Gets the number ads on a page based on an
//array comcast uses to push their ads ad objects into
//depends on the fact that "ary" is defined elsewehere
function sGetNumberOfProducts()
{
 if (window.ary)
     return ary.length;
 else
     return 0;
}

//Methods for tracking and firing events based on percentage of page viewed
//var siteCatalystIsMaximumViewedAreaEvent25 = false;  always has at least 25% of page viewed
var siteCatalystIsMaximumViewedAreaEvent50 = false;
var siteCatalystIsMaximumViewedAreaEvent75 = false;
var siteCatalystIsMaximumViewedAreaEvent100 = false;

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}
function sGetScrollPercentage()
{
	 var y;
	 //Document Height
	 y = getDocHeight();
	 //Client Height
	 y2 = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
	 //Viewport
	 y3 = document.viewport.getScrollOffsets().top;

	 //we have to add the client height to add the entire height of the scrollbar segment since scrolltop only gives the top of the segment
	 y3 = y3 + y2;
	 if (y3 > y2)
	     y2 = y3;
	 var percentage = y2/y;
	 
	 if (percentage > .75)
	 {
	    return 100;
	 }
	 else if (percentage > .5)
	 {
	    return .75;
	 }
	 else if (percentage > .25)
	 {
	    return .50;
	 }
	 else
	 {
		 return .25;
	 }
}

function sScrollingEvent(){
	var percentage = sGetScrollPercentage();
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		if(percentSeen == 100){
			siteCatalystIsMaximumViewedAreaEvent100 = true;
			siteCatalystIsMaximumViewedAreaEvent75 = true;
			siteCatalystIsMaximumViewedAreaEvent50 = true;
			siteCatalystIsMaximumViewedAreaEvent25 = true;
		}
		if (siteCatalystIsMaximumViewedAreaEvent100 == false && percentage >= .75)
		 {
			 siteCatalystIsMaximumViewedAreaEvent100 = true;
			 siteCatalystIsMaximumViewedAreaEvent75 = true;
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
		 else if (siteCatalystIsMaximumViewedAreaEvent75 == false && percentage >= .50)
		 {
			 siteCatalystIsMaximumViewedAreaEvent75 = true;
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
		 else if (siteCatalystIsMaximumViewedAreaEvent50 == false && percentage >= .25)
		 {
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
	} else {
		if(percentSeen == 100){
			siteCatalystIsMaximumViewedAreaEvent100 = true;
			siteCatalystIsMaximumViewedAreaEvent75 = true;
			siteCatalystIsMaximumViewedAreaEvent50 = true;
			siteCatalystIsMaximumViewedAreaEvent25 = true;
		}
		if (siteCatalystIsMaximumViewedAreaEvent100 == false && percentage > .75)
		 {
			 siteCatalystIsMaximumViewedAreaEvent100 = true;
			 siteCatalystIsMaximumViewedAreaEvent75 = true;
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
		 else if (siteCatalystIsMaximumViewedAreaEvent75 == false && percentage > .50)
		 {
			 siteCatalystIsMaximumViewedAreaEvent75 = true;
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
		 else if (siteCatalystIsMaximumViewedAreaEvent50 == false && percentage > .25)
		 {
			 siteCatalystIsMaximumViewedAreaEvent50 = true;
			 siteCatalystIsMaximumViewedAreaEvent25 = true;
			 sTrackPercentPageViewed(25);
		 }
	}
}



//Updates the cookie with # of photos viewed, videos viewed, items contributed
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    currval = unescape(document.cookie.substring(c_start,c_end));
    if(currval < 100)
	setCookie(c_name,parseInt(currval) +1);
    return currval;
    }
  }
setCookie(c_name,1);
return 0;
}
function setCookie(c_name,value)
{
expiredays=cookieLifetime;
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//Configuration Variables
cookieLifetime=365; //# of Days the cookie will last
photoCookieName="photo";
photoHeavyMinimum=18; //Minimum # of Photos to view before being categorized as high-photo;
videoCookieName="video";
VideoHeavyMinimum=3; //Minimum # of videos to view before being categorized as high-video;
contributionCookieName="contribution";
contributionHeavyMinimum=3; //Minimum # of contributions before being categorized as high-contributions;
    /* SiteCatalyst code version: H.20.3.
Copyright 1997-2009 Omniture, Inc. More info available at
http://www.omniture.com */
var s_account="comcastegegdevelopment";
var loc=document.location.toString();
var prodsites = [];
prodsites[0] = "http://www.eonline.com";
prodsites[1] = "http://boards.eonline.com";
prodsites[2] = "http://comcast.eonline.com";
prodsites[3] = "http://www.moviefinder.com";
prodsites[4] = "http://aol.eonline.com";
prodsites[5] = "http://netscape.eonline.com";
prodsites[6] = "http://music.eonline.com";
prodsites[7] = "http://earthlink.eonline.com";
prodsites[8] = "http://celebrityaddictionary.eonline.com";
prodsites[9] = "http://www.thesouptv.com";
prodsites[10] = "http://thesouptv.com";
for (i=0;i<prodsites.length;i++) {
	if ( loc.indexOf(prodsites[i]) != -1) {
		s_account="comcastegegeonlinecom";
		break;
	}
}
var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* Conversion Config */
s.currencyCode="USD";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,jpg";
s.linkInternalFilters="javascript:,eonline.com,seenon.com,#,moviefinder.comlocalhost,aim:BuddyIcon";
s.linkLeaveQueryString=false;
s.linkTrackVars="eVar1,eVar2,eVar3,eVar4,eVar12,eVar13,eVar11,eVar25,eVar41,eVar42,eVar43,eVar44,eVar50,events,products";
s.linkTrackEvents="None";
s.dstStart="03/14/2010";  //daylight saving time begins
s.dstEnd="11/07/2010";  //daylight saving time ends
/* Page Name Plugin Config */
s.pathConcatDelim=":";
s.defaultPage="";
s.queryVarsList="categoryUUID,categoryID,threadID,forumID"; //eonline.com
s._channelDomain="Social Media|facebook.com,twitter.com,digg.com,linkedin.com,myspace.com,stumbleupon.com,delicious.com";
s._channelPattern="banner ads|bn->clickable skins|csk->cpv campaign|cpv->embedded player|ply->internal search|ins->paid search|ppc->partnership links|par->peoplebrowser dms|pb->print ad|pa->rss feeds|rss->social network|sn->special offer|off->sweepstakes|swp->tv ad|tv->vanity url|url->video|vid-";
s._channelParameter="sponsor|spon";

s.server=location.hostname;

/* Plugin Config */
s.usePlugins=true;
function s_doPlugins(s) {
	/* External Campaign Tracking*/
	if(!s.campaign) {
		s.campaign=s.getQueryParam('cmpid','_');
	}
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
	
	/* Internal Campaign Tracking */
	if(!s.eVar45) {
		s.eVar45=s.prop17=s.getQueryParam('intcid');
	}
	s.eVar45=s.getValOnce(s.eVar45,'s_eVar45',0);

	/* Sponsor Campaign Tracking */
	if(!s.eVar46) {
		s.eVar46=s.getQueryParam('spon');
	}
	s.eVar46=s.getValOnce(s.eVar46,'s_eVar46',0);
	
	/* Page Section Tracking */
	if(!s.prop6) {
		s.prop6=s.getQueryParam('#,link',':');
	}
	
	/*Site Domain*/
	s.channel=location.hostname;
	
// indexes 0=search, 1=replace
var sCleanSections = [
	'thesoup the_soup',
	'the-soup the_soup',
	'lyons-den lyons_den',
	'ask-the_answer_bitch ask_the_answer_bitch',
	'marc-malkin marc_malkin',
	'hwood-party_girl hwood_party_girl',
	'party-girl hwood_party_girl',
	'the-awful_truth the_awful_truth',
	'watch-with_kristin watch_with_kristin',
	'fashion-police fashion_police',
	'fashion_police fashion_police',
	'fashion fashion_police',
	'movies movie_reviews',
	'movie-reviews movie_reviews',
	'photos gallery'
];
for (var index = 0; index < sCleanSections.length; ++index) {
  //var item = $w(sCleanSections[index]);  
  var item = sCleanSections[index].split(" "); 
  
  if (item[0] === s.prop1 || s.pageName.indexOf(item[0]) === 0)
  {            
    s.pageName=s.pageName.replace(item[0], item[1]);
	s.prop1=""; //will get rebuilt based on pageName below
    break;
  }
  
}

s.pageName=s.pageName.replace(/::/g,':');

	/*URL Hierarchy*/
	s.hier1=s.getPageName();
	
	/* Use URL for page name via getPageName plugin*/
	
	if (!s.pageName) {
		s.pageName=s.hier1;
	}
	else {
		s.pageName=s.pageName.split('/').join(':');
	}
	if ( loc.indexOf("://celebrityaddictionary") != -1) {
		s.pageName="celebrityaddictionary:" + s.pageName;
	} else if ( loc.indexOf("://boards") != -1){
		s.pageName="boards:" + s.pageName;
	}	
	
	/*Conversion Page Name & Site Hierarchy */
	s.eVar4=s.hier2=s.pageName;
	
	/* Set Sections and Subsections  based on pageName*/
	if (!s.prop1) {
		var pnArray=new Array(3);
		pnArray=s.pageName.split(":");
		if(pnArray[0]) {
			s.eVar1 = s.prop1=pnArray[0];
		}
		else {
			s.eVar1 = s.prop1="home";
		}

		
		if(pnArray[1]) {
			if(pnArray[1] == 'index'){
				s.eVar2 = s.prop2="";
			} else {
				s.eVar2 = s.prop2=s.prop1+":"+pnArray[1];
			}
		}
		
		if(pnArray[2]) {
			if(pnArray[1] == 'index'){
				s.eVar2 = s.prop2="";
				s.eVar3 = s.prop3="";
			} else {
				s.eVar3 = s.prop3=s.prop2+":"+pnArray[2];
			}
			
		}
	}
	
	/* Set Page View Event & initialize Ad Impressions Event*/
	s.events=s.apl(s.events,'event2,event4',',',2);

	/* Set Time Parting Variables  */
	// Set hour
	if(!s.prop11&&!s.eVar11) { 
		s.prop11=s.eVar11=s.getTimeParting('h','-8'); 
		}  

	// Set day
	if(!s.prop12&&!s.eVar12) { 
		s.prop12=s.eVar12=s.getTimeParting('d','-8');
	}
	
	// Set weekday 
	if(!s.prop13&&!s.eVar13) {
		s.prop13=s.eVar13=s.getTimeParting('w','-8');
	}
	
	s.prop45 = s.prop11.split("30").join("00");
	/* Days since last visit */
	s.eVar10=s.prop22 = s.getValOnce(s.getDaysSinceLastVisit('s_lv') + "",'s_eVar10',0);

	/* New/Repeat Visitor  */
	s.prop23=s.eVar24 = s.getNewRepeat();
	
	/* Heavy Video,Photo,Contributor  */
	s.prop42 = sGetHeavyVideo();
	s.prop43 = sGetHeavyPhoto();
	s.prop44 = sGetHeavyContributor();

	/* Copy props to eVars */
	if(s.prop1&&!s.eVar1) { s.eVar1=s.prop1; }
	if(s.prop2&&!s.eVar2) { s.eVar2=s.prop2; }
	if(s.prop3&&!s.eVar3) { s.eVar3=s.prop3; }

	if(s.prop7&&!s.eVar7) { s.eVar7=s.prop7; }
	//if(s.prop9&&!s.eVar9) { s.eVar9=s.prop9; }
	if(s.prop14&&!s.eVar14) { s.eVar14=s.prop14; }
	if(s.prop15&&!s.eVar15) { s.eVar15=s.prop15; }
	if(s.prop42&&!s.eVar42) { s.eVar42=s.prop42; }
	if(s.prop43&&!s.eVar43) { s.eVar43=s.prop43; }
	if(s.prop44&&!s.eVar44) { s.eVar44=s.prop44; }
	if(s.prop50&&!s.eVar50) { s.eVar50=s.prop50; }
	

	/* DynamicObjectIDs config */
	function s_getObjectID(o) {
		var ID=o.href;
		ID=ID.replace("?","_");
		return ID;
	}

	s.getObjectID=s_getObjectID;
	/* To setup Dynamic Object IDs */
	s.setupDynamicObjectIDs();
	
	/*Downloads & Exits*/
	var sCustomUrl=s.linkHandler();
	var sDownloadUrl=s.downloadLinkHandler();
	var sExitUrl=s.exitLinkHandler();
	if((sExitUrl.length > 7) && (sExitUrl.indexOf("widget") <1)) {
		s.linkTrackVars=sLinkTrackVars;
		s.linkTrackEvents="eventX"; //don't track events
	} else if((sDownloadUrl.length >4) || (sExitUrl.indexOf("widget") >1)){
		s.linkTrackVars+=",prop16,eVar16,eVar17,prop27,prop18,eVar5,eVar21,events";
		s.linkTrackEvents="event5";
	}
	
	
	/* Referring Channel Manager */
	s.channelManager('cmpid',':','s_cm','','c_m2');
		s.eVar30=s._referringDomain;
		s.campaign=s._campaignID;
		s.eVar32=s._keywords;
		s.eVar31=s._channel;
		
	/* Internal Email Campaign Bucketing */
	if(s.eVar45.substring(0,3)=='emn'){
		s.eVar31="email";		
	}
	if(s.eVar45.substring(0,6)=='emn-vd'){
		s.eVar31="email newsletter main video promo";			
	}
	s.eVar31=s.getValOnce(s.eVar31,'s_eVar31',0);
	
}
s.doPlugins=s_doPlugins;
/************************** PLUGINS SECTION *************************/
/*
 * Plugin: exitLinkHandler 0.5 - identify and report exit links
 */
s.exitLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
+"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
+"nkType='e';else h='';s[n]=t;return h;");
/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");
/*
 * Plugin: downloadLinkHandler 0.5 - identify and report download links
 */
s.downloadLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");
/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'new';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'new';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'repeat';}else retur"
+"n 'repeat';");

/*
 * Plugin: Days since last Visit 1.1.H -JE-  ALTERED
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);var rval = 0;if(cval.length==0){"
+"s.c_w(c,ct,e);s.c_w(c+'_s',f1,es);}else{var d=ct-cval;rval = d/(100"
+"0*60*60*24);if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);s.c_w(c+'_s"
+"',f2,es);}else if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);s.c_w(c+'_s'"
+",f3,es);}else if(d<7*day+1 && d>day){s.c_w(c,ct,e);s.c_w(c+'_s',f4,"
+"es);}else if(d<day+1){s.c_w(c,ct,e);s.c_w(c+'_s',f5,es);}}else{s.c_"
+"w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,es);}}cval_s=s"
+".c_r(c+'_s');return Math.floor(rval);"
);
/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Plugin: getTimeParting 2.0 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
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
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/*
 * Plugin: getValOnce 1.0 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * channelManager v2.4 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"
+"rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"
+"ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"
+"nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"
+"l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"
+"Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"
+",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"
+"chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"
+"=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"
+"D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"
+"G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("
+"k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"
+"=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"
+"=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"
+");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"
+"aid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Sea"
+"rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct Load'}X=M+u+t;c=c?c:'c_m';"
+"if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"
+"=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"
+"(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"
+"h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"
+"th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."
+"indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"
+"';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"
+"ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"
+"ign=u;s._keywords=M;s._channel=P");
/* non-custom list */
s.seList="search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com"
+",ask.co.uk|ask,q|Ask Jeeves>google.co,googlesyndication.com|q,as_q|"
+"Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q"
+"|Google - Australia>google.be|q,as_q|Google - Belgium>google.com.br"
+"|q,as_q|Google - Brasil>google.ca|q,as_q|Google - Canada>google.cl|"
+"q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co"
+"|q,as_q|Google - Colombia>google.dk|q,as_q|Google - Denmark>google."
+"com.do|q,as_q|Google - Dominican Republic>google.fi|q,as_q|Google -"
+" Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google -"
+" Germany>google.gr|q,as_q|Google - Greece>google.com.hk|q,as_q|Goog"
+"le - Hong Kong>google.co.in|q,as_q|Google - India>google.co.id|q,as"
+"_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.co.i"
+"l|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.co."
+"jp|q,as_q|Google - Japan>google.com.my|q,as_q|Google - Malaysia>goo"
+"gle.com.mx|q,as_q|Google - Mexico>google.nl|q,as_q|Google - Netherl"
+"ands>google.co.nz|q,as_q|Google - New Zealand>google.com.pk|q,as_q|"
+"Google - Pakistan>google.com.pe|q,as_q|Google - Peru>google.com.ph|"
+"q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google"
+".pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto R"
+"ico>google.ro|q,as_q|Google - Romania>google.com.sg|q,as_q|Google -"
+" Singapore>google.co.za|q,as_q|Google - South Africa>google.es|q,as"
+"_q|Google - Spain>google.se|q,as_q|Google - Sweden>google.ch|q,as_q"
+"|Google - Switzerland>google.co.th|q,as_q|Google - Thailand>google."
+"com.tr|q,as_q|Google - Turkey>google.co.uk|q,as_q|Google - United K"
+"ingdom>google.co.ve|q,as_q|Google - Venezuela>bing.com|q|Microsoft "
+"Bing>naver.com,search.naver.com|query|Naver>yahoo.com,search.yahoo."
+"com|p|Yahoo!>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>yah"
+"oo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>sg.yahoo.com,sg.sea"
+"rch.yahoo.com|p|Yahoo! - Singapore>uk.yahoo.com,uk.search.yahoo.com"
+"|p|Yahoo! - UK and Ireland>search.cnn.com|query|CNN Web Search>sear"
+"ch.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Se"
+"arch>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Searc"
+"h";
/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="comcastentertainmentgroup";
s.trackingServer="wa.eonline.com";
s.dc=112;
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


    // indexes 0=url, 1=pagename 2=source 3=type
var sUrlToPageNameMappingArray = [
    '/ news null news',    
    '/index.jsp news null news',    
    '/site/site.jsp news null news',
    '/Insider/Boards/forum.jspa?forumID=57 girls-next-door:boards null board',
    '/on/shows/index.jsp shows null landing',
    '/on/index.jsp schedule null landing',
    '/on/ schedule null landing',
    '/on/personalities/bio/chelsea.jsp chelsea:personalities:bio null bio',
    '/on/personalities/index.jsp personalities null landing',
    '/uberblog/index.jsp news null news',
    '/account/home/index.jsp account:home null account',
    '/uberblog/ news null news',
    '/uberblog/fashion/index.html fashion:news null news',
    '/uberblog/fashion/ fashion:news null news',
    '/uberblog/the_soup/index.html the-soup null news',
    '/uberblog/the_soup/ the-soup null news',
    '/sweepstakes/ sweepstakes null landing',
    '/uberblog/fashion/ fashion null news',
    '/photos/index.jsp gallery:photos null page',
    '/movies/reviews/ movies:reviews null index',
    '/shows/chelsea/index.jsp chelsea null show',
    '/shows/chelsea/chelseaness/index.jsp chelsea:news null news',
    '/shows/chelsea/theshow/index.jsp chelsea:the-show null show',
    '/shows/chelsea/chuy/index.html chelsea:chuy:news null news',
    '/shows/chelsea/chuy/index.jsp chelsea:chuy:news null news',
    '/shows/chelsea/whoachuy/ chelsea:whoachuy null extras',
    '/uberblog/the_awful_truth/index.html the_awful_truth null news',
        
    '/news/the_awful_truth the_awful_truth null news',
    '/news/fashion/ fashion null news',
    '/news/fashion fashion:news null news'
];

//property  initialization
//BEGINS HERE

//functions and variables to see if a window.location.pathname should be checked for dynamic page naming rules

function sIsPathnameIncluded(sPath)
{
	if (window.location.pathname.length >= sPath.length && window.location.pathname.substring(0,sPath.length) == sPath)
		return true;
	else
		return false;
}


//if (sIsPathnameIncluded("/on/") || sIsPathnameIncluded("/about/") || sIsPathnameIncluded("/movies/") || sIsPathnameIncluded("/everywhere/") || sIsPathnameIncluded("/celebrities/") || sIsPathnameIncluded("/sweepstakes/"))
//if (sIsPathnameIncludedInArray(sAryOfPathsToCheck))

if(sIsPathnameIncluded("/error/404.jsp") || sIsPathnameIncluded("/error/500.jsp") || sIsPathnameIncluded("/error/503.jsp")){
	s.prop15="errorPage";
	s.pageType = "errorPage";
}

//Dynamically name the page based on the URL

var sQueryStringArray = window.location.toString().toQueryParams();

if(sIsPathnameIncluded("/uberblog/bio.jsp") || sIsPathnameIncluded("/news/bio.jsp")){
	var query = location.search;
	var value = query.split("=")[1];

	s.prop15="bio";
	s.pageName = value + ":bio";
}

if (sIsPathnameIncluded("/videos/"))
{
	s.prop15="video";
	s.pageName = "videos";
	s.prop1="videos"

	if (sQueryStringArray != null && sQueryStringArray.franchise != null)
		s.prop7 = sQueryStringArray.franchise;
}
else if (s.pageName == null || s.pageName == "" || sIsPathnameIncluded("/on/"))  //we always override the nielsen.jsp values from "/on/" since there were legacy values there that we haven't been able to clear out yet
{

	//some special cases about what the page type will be

	if (sIsPathnameIncluded("/sponsor/"))
		s.prop15 = "landing";
	else if (sIsPathnameIncluded("/uberblog/") || sIsPathnameIncluded("/news/"))
		s.prop15 = "news";
	else
		s.prop15 = "page";

	var strPageName = window.location.pathname;

	//get rid of the trailing / if there is one
	if (strPageName.length > 0 && strPageName.substring(strPageName.length-1,strPageName.length) == "/")
		strPageName = strPageName.substring(0, strPageName.length-1);

	//all the custom string replacment rules go here
	strPageName = strPageName.replace("/index.jsp", "").replace("/redcarpet/", "/red-carpet/").replace("/includes/", "").replace("/index.html", "").replace("/on/shows/", "").replace("/on/", "").replace("/e/","").replace("/uberblog/index", "/news/index").replace("/uberblog/", "/").replace("/celebrities/", "/celebs/").replace(".jsp", "").replace(".html", "").replace(/\//g, ":").replace("_", "-").replace("index.", "index:").replace("@","at");

	//get rid of the leading : if there is one
	if (strPageName.length > 0 && strPageName.substring(0,1) == ":")
		strPageName = strPageName.substring(1, strPageName.length);

	if (sQueryStringArray != null)
	{
		if(sQueryStringArray.cid != null)
			strPageName = strPageName + ":" + sQueryStringArray.cid;

	}

	s.pageName = strPageName.toLowerCase();
}
else
{
	s.pageName = s.pageName.replace(".html", "");
}

// all "/on" pages should be type shows regardless
if (sIsPathnameIncluded("/on/shows/") || sIsPathnameIncluded("/e/enews/"))
{
	s.prop15 = "show";
}

//stick page content source name in front of the page name if it's not already there
if (s.prop7 != null && s.prop7 != "")
{
	if (s.pageName.length < s.prop7.length || s.pageName.substring(0,s.prop7.length) != s.prop7)
		s.pageName = s.prop7 + ":" + s.pageName
}
//end of dynamic page naming, the following is static mapping that overrides any dynamic rules or variables passed into nielsen.jsp

if(sIsPathnameIncluded("/uberblog/redcarpet/video/") || sIsPathnameIncluded("/news/redcarpet/video/")){
	s.prop15 = "video";
}
if(sIsPathnameIncluded("/uberblog/redcarpet/games/") || sIsPathnameIncluded("/news/redcarpet/games/")){
	s.prop15 = "extras";
}

//note that if the page is in the mapping array, all the pagename logic that was set above is overwrittens
for (var index = 0; index < sUrlToPageNameMappingArray.length; ++index) {
  var item = sUrlToPageNameMappingArray[index].split(" ");
  //var item = $w(sUrlToPageNameMappingArray[index]);

  if ( item[0] == window.location.pathname ) {
    s.pageName = item[1]; // page name
    s.prop7 = item[2] != "null" ? item[2] : ""; // page content source
    s.prop15 = item[3]; // page type
    break;
  }
}
//tack on the author if there is one
if (sQueryStringArray != null)
{
	if(sQueryStringArray.author != null)
		s.pageName = s.pageName + ":by-author:" + sQueryStringArray.author.replace("+","-").replace(" ","-");
	if(sQueryStringArray.start != null)
		s.pageName = s.pageName + ':' + sQueryStringArray.start;
}

//s.prop16 = sGetTitlesByCssClass(sTrackingCssNameWidgets);
s.prop19 = sGetTitlesByCssClass(sTrackingCssNameVideos);

s.products=";;;;event4=" +  sGetNumberOfProducts(); //initial value sent with page view

//initialize %page viewed and set/check cookie

function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal (j);
      }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
    }
  return null;
}

function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
if(window.location.href.match(/\?scroll\=true/i)){
	SetCookie('scrolltracking', 'true', 0);
}
if(window.location.href.match(/\?scroll\=false/i)){
	SetCookie('scrolltracking', 'false', 0);
}
if (GetCookie('scrolltracking') == null) {
	SetCookie('scrolltracking', 'false', 0);
	runScrollTracking('false');
} else {
	var scrollCookieVal = GetCookie('scrolltracking');
	if(scrollCookieVal == 'true'){
		runScrollTracking('true');
	}
}
function runScrollTracking(status){
	var randomNum=Math.floor(Math.random()*101);
	if(randomNum <= 5 || status == 'true'){
		if (s.events == null || s.events == "")
			s.events="event22";
		else
			s.events = s.events + ",event22";
		sSetPercentSeen(sGetScrollPercentage()); //set page viewed by default when page first loads
		s.prop26="scroll:" + s.pageName; //traffic variable for pages to detect time btw scrolls
		s.products=";;;;event22=" + sGetPercentSeen()  + "|event4=" +  sGetNumberOfProducts(); //initial value sent with page view

		Event.observe(window, 'scroll', sScrollingEvent);
		//Event.observe(window, 'resize', sScrollingEvent);
	}
}

//Widget Tracking
var widgetArray=new Array();

//Initializing Home nav tracking depending on which host the site is being dispalyed on
var currentHost;


{
	if(document.getElementById('top_navigation_links')){

		// For 5% of all visitors, enable widget tracking on the home nav 
		// Set a session cookie containing so inclusion/exclusion persists across page views
		
		
		if (GetCookie('s_includeInMainNavTracking') === null) {
			var includeInRandomSample = (Math.random() <= 0.05 ? 'include': 'exclude');
			var expirationDate = new Date();
			// Set a session cookie
			SetCookie('s_includeInMainNavTracking', includeInRandomSample, 0);
		}
		
		if (GetCookie('s_includeInMainNavTracking') === 'include'){
			//Call home nav click function
			widgetArray.push('top-navigation');
			homeNavTracking();
		}
	}
}

if(document.getElementById('front_door_spots_cont')){
	widgetArray.push('frontdoor-brick');
	//brickSpots();
}
if(document.getElementById('module_fashion_police')){
	widgetArray.push('the-fashion-police');
	fashionPoliceModule();
}
if(document.getElementById('module_bigpicture')){
	widgetArray.push('the-big-picture');
	bigPicModule();
}
if(document.getElementById('module_topgalleries')){
	widgetArray.push('top-galleries');
	topGalleryModule();
}
var widgetSet=widgetArray.join();
s.prop16=widgetSet;

//Convert string to lowercase, remove punctuation, and replace spaces with "-"
function cleanString(dirtyString){
	return dirtyString.toLowerCase().replace(/\s+/g,'-').replace(/[\/!@#$%^&*(),.?'"]+/g,'').replace("--","-").replace(/-ï¿½/g,"").replace(/btch/g,"bitch").replace(/amp\;/g,"and").replace(/ï¿½/g,"e");
}
document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)){
			retnode.push(elem[i]);
		}
	}
	return retnode;
};
//Main Nav click tracking
function homeNavTracking(){
	var navLinks = document.getElementById('top_navigation_links').getElementsByTagName('a');
	var hostVal;
	for(i=0; i<navLinks.length; i++){
		navLinks[i].onclick=function() {
			if(this.href.match(window.location.host)){
				hostVal = 'e';
			} else {
				hostVal = this.href.replace(/http:\/\//g,"").split("/")[0].replace(/.com/g,"").replace(/.eonline/g,"").replace(/\//g,"").replace(/www./g,"").replace(/celebrity/g,"");
			}
			if(this.className == 'tab' || this.className == 'tab last'){
				sTrackWidgetClick('top-navigation:' + cleanString(this.innerHTML.stripTags()),'',hostVal);
			} else {
				var parentTab = this.parentNode;
				while(parentTab.className != 'sub_nav'){
					parentTab = parentTab.parentNode;
				}
				var section = cleanString(parentTab.parentNode.getElementsByTagName('a')[0].innerHTML.stripTags());
				sTrackWidgetClick('top-navigation:'+section +':'+cleanString(this.innerHTML.stripTags()),'',hostVal);
			}
			//return false;
		}
	}
}
//Front Door Brick Tracking
/*function brickSpots(){
	var brickLinks = document.getElementById('front_door_spots').getElementsByTagName('a');
	for(i=0;i<brickLinks.length;i++){
		brickLinks[i].onclick=function(){
			if(this.getElementsByClassName('spot_title')){
				var title = this.getElementsByClassName('spot_title');
				sTrackWidgetClick('frontdoor-brick:'+cleanString(title[0].innerHTML.stripTags()));
				return false;
			}
		}
	}
}
*/
//Big Picture module click tracking
function bigPicModule(){
	//Establish current titles
	var moduleTitle = "big-picture";
	var imgTitle = cleanString($$('#module_bigpicture .bigPicImgLink')[0].readAttribute('title').stripTags());
	var captionTitle = cleanString($$('#module_bigpicture .bigPicFullTitle')[0].innerHTML.stripTags());

	$$('#module_bigpicture .bigPicImgLink').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':image';
			sTrackWidgetClick(titleString);
			var relVal = $(el).readAttribute("rel");
			pageTracker._trackPageview(relVal);
		});
	});
	$$('#module_bigpicture .bigPicFullTitle').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':' + captionTitle;
			sTrackWidgetClick(titleString);
			var relVal = $(el).readAttribute("rel");
			pageTracker._trackPageview(relVal);
		});
	});
	$$('#module_bigpicture .bigPicGrab').each(function (el) {
		$(el).observe('click', function() {
			sSetWidgetDistributeInfo('big-picture:grab-share','big-picture','widget','clearspring')
		});
	});
	$$('#module_bigpicture .bigPicMore').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':more-photos';
			sTrackWidgetClick(titleString);
			var relVal = $(el).readAttribute("rel");
			pageTracker._trackPageview(relVal);
		});
	});
}

//Fashion Police module click tracking
function fashionPoliceModule(){
	//Establish current titles
	var moduleTitle = "fashion-police";
	var imgTitle = cleanString($$('#module_fashion_police .img_link img')[0].readAttribute('title').stripTags());
	var captionTitle = cleanString($$('#module_fashion_police .gallerySpotTitle')[0].innerHTML.stripTags());

	$$('#module_fashion_police .more_button').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':more-photos';
			sTrackWidgetClick(titleString);
		});
	});

	$$('#module_fashion_police .img_link').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':image';
			sTrackWidgetClick(titleString);
		});
	});

	$$('#module_fashion_police .gallerySpotTitle').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':' + imgTitle+ ':' + captionTitle;
			sTrackWidgetClick(titleString);
		});
	});
}
function topGalleryModule(){
	//Establish current titles
	var moduleTitle = "top-galleries";

	$$('#module_topgalleries .more_button').each(function (el) {
		$(el).observe('click', function() {
			var titleString = moduleTitle + ':more-photos';
			sTrackWidgetClick(titleString);
		});
	});

	$$('#module_topgalleries .topGalImg').each(function (el) {
		$(el).observe('click', function() {
			var imgTitle = cleanString($(el).readAttribute("title"));
			var titleString = moduleTitle + ':' + imgTitle+ ':image';
			sTrackWidgetClick(titleString);
		});
	});

	$$('#module_topgalleries .gallery_title').each(function (el) {
		$(el).observe('click', function() {
			var imgTitle = cleanString($(el).readAttribute("rel"));
			var titleString = moduleTitle + ':' + imgTitle + ':text';
			sTrackWidgetClick(titleString);
		});
	});
}

/* Photo Gallery Filtering Naming */
if(window.location.href.match(/\/photos\/index.jsp\?category/i)){
	var categoryTitleCont = document.getElementById("category_header").getElementsByTagName("h3");
	var categoryTitle =	cleanString(categoryTitleCont[0].innerHTML.stripTags());
	s.pageName = "gallery:photos:" + categoryTitle;
	s.prop15="page";
}
//Custom Chelsea Values placed here to prevent override
if(sIsPathnameIncluded("/on/shows/chelsea/chelseaness/b")){
	var thisURL = window.location.toString();
	var value = thisURL.split("/chelseaness/")[1].replace('.html','');

	s.prop15="news";
	s.pageName = 'chelsea:news:detail:' + value;
}
if(sIsPathnameIncluded("/on/shows/chelsea/chuy/b")){
	var thisURL = window.location.toString();
	var value = thisURL.split("/chuy/")[1].replace('.html','');

	s.prop15="news";
	s.pageName = 'chelsea:chuy:news:detail:' + value;
}

if(window.location.href.match(/\/shows\/chelsea\/chelseaness\/index.jsp\?cid=bio/i)){
	s.prop15="bio";
	s.pageName = 'chelsea:bio';
}
if(window.location.href.match(/\/shows\/chelsea\/chuy\/index.jsp\?cid=bio/i)){
	s.prop15="bio";
	s.pageName = 'chelsea:chuy:bio';
}
if(window.location.href.match(/\/shows\/chelsea\/chelseaness\/index.jsp\?cid=book/i)){
	s.prop15="show";
	s.pageName = 'chelsea:book';
}
if(window.location.href.match(/\/shows\/chelsea\/chelseaness\/index.jsp\?cid=tour/i)){
	s.prop15="show";
	s.pageName = 'chelsea:tour';
}
if(window.location.href.match(/\/shows\/chelsea\/chelseaness\/chelsea\/index.[0-9]+.html/i)){
	var thisURL = window.location.toString();
	var value = thisURL.split("/on/shows/chelsea/chelseaness/chelsea/index.")[1];
	var justPageNum = value.split('.')[0];
	s.prop15="news";
	s.pageName="chelsea:news:" + justPageNum;
}
if(window.location.href.match(/\/shows\/chelsea\/chelsea_lately\/page\/\d/i)){
	var thisURL = window.location.toString();
	var value = thisURL.split("/on/shows/chelsea/chelsea_lately/page/")[1];
	var justPageNum = value.split('.')[0];
	s.prop15="news";
	s.pageName="chelsea:news:" + justPageNum;
}
if(window.location.href.match(/\/shows\/chelsea\/chuy\/chelsea\/index.[0-9]+.html/i)){
	var thisURL = window.location.toString();
	var value = thisURL.split("/on/shows/chelsea/chuy/chelsea/index.")[1];
	var justPageNum = value.split('.')[0];
	s.prop15="news";
	s.pageName="chelsea:chuy:news:" + justPageNum;
}

if(window.location.href.match(/\/shows\/chelsea\/chuy\/page\/\d/i)){
	var thisURL = window.location.toString();
	var value = thisURL.split("/on/shows/chelsea/chuy/page/")[1];
	var justPageNum = value.split('.')[0];
	s.prop15="news";
	s.pageName="chelsea:chuy:news:" + justPageNum;
}

if(window.location.href.match(/\/shows\/chelsea\/vids\/index.jsp/i)){
	s.prop15="video";
}
if(window.location.href.match(/\/shows\/chelsea\/theshow\/bigfatbaby\/thankyou.jsp/i)){
	s.pageName="chelsea:the-show:big-fat-baby:thankyou";
	s.prop15="show";
}
//Red Carpet Extra Mapping
if(window.location.href.match(/\/uberblog\/redcarpet\/games\/poseoff\/index.jsp/i) || window.location.href.match(/\/news\/redcarpet\/games\/poseoff\/index.jsp/i) ){
	//Get Query values
	var query = location.search;
	//Extract value and year from value 1 to flip it to the other side of the show and strip the underscores
	var value1 = query.split("=")[1];
	value1 = value1.split("&")[0];
	var year = value1.split("_")[0];
	value1 = value1.replace(year + "_","").replace("golden_","").replace("_awards","").replace("sag","sags");
	value1= value1 + year;

	var value2 = query.split("=")[2];

	//Set props 1-3
	s.prop1="red_carpet";
	s.prop2=value1;
	s.prop3="extras";

	//Set full string
	s.pageName=s.prop1 + ':' + s.prop2 + ':' + s.prop3 + ':' + "poseoff" + ':' + value2;
}
//Celebs
if(window.location.href.match(/\/uberblog\/celebs\/[A-Za-z0-9]/i) ){
	var thisURL = window.location.toString();
	var value = thisURL.split("/uberblog/celebs/")[1];
	var pageId = value.split('_')[0];
	var celebId = value.split(pageId)[1].replace("_","").replace(".html","").toLowerCase();
	s.pageName = "celebs:"+pageId+":"+celebId;
}

if(window.location.href.match(/\celebs\/[A-Za-z0-9]/i) ){
	var thisURL = window.location.toString();
	var value = thisURL.split("/celebs/")[1];
	var pageId = value.split('_')[0];
	var celebId = value.split(pageId)[1].replace("_","").replace(".html","").toLowerCase();
	s.pageName = "celebs:"+pageId+":"+celebId;
}


//Category Pagenaming
if(window.location.href.match(/\/index.html\?categories\=/i)){
	var thisURL		= window.location.toString();
	var topicRaw	= thisURL.split("/uberblog/")[1];
	var topic		= topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	var category 	= thisURL.split("?categories=")[1];

	//If we find a red carpet package add redcarpet
	if(thisURL.match(/oscar/i) || thisURL.match(/sag/i) || thisURL.match(/grammys/i) || thisURL.match(/emmys/i) || thisURL.match(/golden/i)){
		topicDate = topic.split("_")[0];
		topicName = topic.split("_")[1];
		topicCombined = topicName+topicDate.replace("-","");
		s.pageName = "red_carpet:"+topicCombined+":news";
	} else {
		s.pageName = topic+":"+category+":news";
	}
}
//Category Paging
if(window.location.href.match(/\/index.[0-9].html\?categories\=/i)){
	var thisURL		= window.location.toString();
	var topicRaw	= thisURL.split("/uberblog/")[1];
	var topic		= topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	var category 	= thisURL.split("?categories=")[1];
	var pageNum		= thisURL.split("index.")[1].replace(".html","").replace("?categories=","").replace(category,"");
	//If we find a red carpet package add redcarpet
	if(thisURL.match(/oscar/i) || thisURL.match(/sag/i) || thisURL.match(/grammys/i) || thisURL.match(/emmys/i) || thisURL.match(/golden/i)){
		topicDate = topic.split("_")[0];
		topicName = topic.split("_")[1];
		topicCombined = topicName+topicDate.replace("-","");
		s.pageName = "red_carpet:"+topicCombined+":news:"+pageNum;
	} else {
		s.pageName = topic+":"+category+":news:"+pageNum;
	}
}
//Franchise Pagenaming
if(window.location.href.match(/\/index.html\?franchise\=/i)){
	var thisURL		= window.location.toString();
	var topicRaw	= thisURL.split("/uberblog/")[1];
	var topic		= topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	var franchise 	= thisURL.split("?franchise=")[1];

	//If we find a red carpet package add redcarpet
	if(thisURL.match(/oscar/i) || thisURL.match(/sag/i) || thisURL.match(/grammys/i) || thisURL.match(/emmys/i) || thisURL.match(/golden/i)){
		topicDate = topic.split("_")[0];
		topicName = topic.split("_")[1];
		topicCombined = topicName+topicDate.replace("-","");
		s.pageName = "red_carpet:"+topicCombined+":news";
	} else {
		s.pageName = franchise+":"+topic+":news";
	}
}
//Franchise Paging
if(window.location.href.match(/\/index.[0-9].html\?franchise\=/i)){
	var thisURL		= window.location.toString();
	var topicRaw	= thisURL.split("/uberblog/")[1];
	var topic		= topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	var franchise 	= thisURL.split("?franchise=")[1];
	var pageNum		= thisURL.split("index.")[1].replace(".html","").replace("?franchise=","").replace(franchise,"");

	//If we find a red carpet package add redcarpet
	if(thisURL.match(/oscar/i) || thisURL.match(/sag/i) || thisURL.match(/grammys/i) || thisURL.match(/emmys/i) || thisURL.match(/golden/i)){
		topicDate = topic.split("_")[0];
		topicName = topic.split("_")[1];
		topicCombined = topicName+topicDate.replace("-","");
		s.pageName = "red_carpet:"+topicCombined+":news:"+pageNum;
	} else {
		s.pageName = franchise+":"+topic+":news:"+pageNum;
	}
}

var franchises = ["the_awful_truth","watch_with_kristin","marc_malkin","ask_the_answer_bitch","hwood_party_girl","lyons_den","the_soup","movie_reviews"];


(function() { 
    var authors = window.location.pathname.match(/^\/news(\/(.*?)(?=\/))?\/author\/(.+?)(\/page\/(\d+))?\/?$/);    
    var keywords = window.location.pathname.match(/^\/news\/?(((?!(\/\d+$)).)*)(page\/(\d+))?$/);
    
    var pageNum;
    
    if ( authors ){
        pageNum = authors[5] || 1;
        var keyword = authors[2] || "news";
        var author = authors[3] || "";
        s.pageName = keyword + ":by-author:" + author + ( (pageNum > 1 ) ? ":" + pageNum : "");        
    } else if ( keywords ) {
        var k = (keywords[1] || "").split("/");

        var franchise = "";
        var category = "news";
        while ( k.length > 0 ) {
            var key = k[0];
            k.pop();
            if ( key.length > 0 ) {
                franchises.indexOf(key || "") >= 0 ? franchise = key : category = key;
            }
        }
        pageNum = keywords[5] || 1;
        if ( franchise ) {
            s.pageName = franchise + ( ( pageNum > 1 ) ? ":index:" + pageNum : "");
        } else {
            s.pageName = category + ( ( pageNum > 1 ) ? ":index:" + pageNum : "");
        }                       
    }
})();


(function($){
    $("body.detail").each( function() {
        var omni = function() {
            var tags = ($("div.entry_footer div.categories a").map(function(i, item) {            
                return $(item).text().toLowerCase().replace(/\s/g,"-").replace(/[,\/?:@&=+$#\.]/g,"");
            }).get() || [] ).join(",");
            return tags.match(/.{1,99}(,|$)/g); 
        }() || [];
        s.prop9 = omni[0] || "";
	s.prop10 = omni[1] || "";
    });
})(jQuery)



//Property and page initialization
//ENDS HERE