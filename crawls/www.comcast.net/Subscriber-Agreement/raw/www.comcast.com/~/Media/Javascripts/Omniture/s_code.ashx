/***TouchCommerce Listeners
* 
* Code below to capture event listeners as outlined by TouchCommerce in
* prop54 (Proactive Chat Group),prop55 (Proactive Chat Targeted), prop56 (Proactive Chat Exposed)
* To capture interacted whe will use event40.
* 
****/

var chatLaunchedListener = {
    onChatLaunched: function (evt) {
        s.prop56 = 'tc:exposed';
        s.linkTrackVars = 'prop56,prop55,prop54';
        s.linkType = 'o';
        s.linkName = 'TC:Chat Exposed Assignment';
        s.lnk = true;
        s.t();
    }
};

var groupAssignmentListener = {
    onGroupAssignment: function (evt) {
        s.prop54 = 'tc:' + evt.group.toString().toLowerCase();
        s.linkTrackVars = 'prop54';
        s.linkType = 'o';
        s.linkName = 'TC:Chat Group Assignment';
        s.lnk = true;
        s.t();
    }
};

var targetedListener = {
    onTargeted: function (evt) {
        s.prop55 = 'tc:' + evt.group.toString().toLowerCase() + ':targeted';
        s.prop54 = 'tc:' + evt.group.toString().toLowerCase();
        s.linkTrackVars = 'prop55,prop54';
        s.linkType = 'o';
        s.linkName = 'TC:Chat Targeted Assignment';
        s.lnk = true;
        s.t();
    }
};

var saleLandingListener = {
    onSaleEvent: function (evt) {
        s.linkTrackVars = 'prop54,prop55,prop56,events';
        s.linkTrackEvents = 'event40';
        s.events = 'event40';
        s.linkType = 'o';
        s.linkName = 'TC:Chat Interacted';
        s.lnk = true;
        s.t();
    }
};

if (typeof (InqRegistry) == 'undefined') {
    var InqRegistry = { chatListeners: [chatLaunchedListener],
        incrementalityListeners: [groupAssignmentListener, targetedListener],
        saleListeners: [saleLandingListener]
    };
}
else // TC already initialized this variable, so append to the existing listeners.
{
    var chatEventListeners = [chatLaunchedListener];
    var incrementalityEventListeners = [groupAssignmentListener, targetedListener];
    var saleEventListeners = [saleLandingListener];

    if (typeof (InqRegistry.chatListeners) != 'undefined') {
        for (counter = 0; counter < InqRegistry.chatListeners.length; counter++) {
            chatEventListeners.push(InqRegistry.chatListeners[counter]);
        }
    }

    if (typeof (InqRegistry.incrementalityListeners) != 'undefined') {
        for (counter = 0; counter < InqRegistry.incrementalityListeners.length; counter++) {
            incrementalityEventListeners.push(InqRegistry.incrementalityListeners[counter]);
        }
    }

    if (typeof (InqRegistry.saleListeners) != 'undefined') {
        for (counter = 0; counter < InqRegistry.saleListeners.length; counter++) {
            saleEventListeners.push(InqRegistry.saleListeners[counter]);
        }
    }


    InqRegistry = { chatListeners: chatEventListeners,
        incrementalityListeners: incrementalityEventListeners,
        saleListeners: saleEventListeners
    };
}

/* SiteCatalyst code version: H.24.4.
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
//Updated on 08-22-2012

/* Specify the Report Suite ID(s) to track here */
var s_account = "comcastdotcomqa";  //qa environment, staging environment
if (location.href.indexOf('localhost') > -1) s_account = "comcastdotcomdev";    //local environment
if (location.href.indexOf('ccqa4') > -1 ||
	location.href.indexOf('ccperf') > -1 ||
	location.href.indexOf('ccpfix') > -1 ||
    location.href.indexOf('ccbeta') > -1 ||
    location.href.indexOf('qa-3.comcast.com') > -1 ||
    location.href.indexOf('qa-2.comcast.com') > -1 ||
    location.href.indexOf('qa-1.comcast.com') > -1 ||
    location.href.indexOf('qa-4.comcast.com') > -1 ||
    location.href.indexOf('qa-5.comcast.com') > -1 ||
    location.href.indexOf('dev.comcast.com') > -1 ||
    location.href.indexOf('stage-user-comcastcom.cable.comcast.com') > -1 ||
    location.href.indexOf('wcstg.comcast.com') > -1 ||
    location.href.indexOf('verify.comcast.com') > -1) {

    s_account = "comcastdotcomqa";  //qa environment, staging environment
}
else if (location.href.indexOf('.comcast.com') > -1 ||
		 location.href.indexOf('comcast.convergentcare.com') > -1 ||
		 location.href.indexOf('comcastvoices.com') > -1 ||
		 location.href.indexOf('mylocalcomcast.com')) {

    s_account = "comcastdotcomprod";    //production environment
}

if (location.href.match('xfinity.com')) {
    if (location.host.match(/(local|dev)\.xfinity\.com/)) {
        s_account = 'comcastdotcomdev';
    } else if (location.host.match(/(staging|load\.qa|sprint\.qa|mr\.qa|cima\.qa)\.xfinity\.com/)) {
        s_account = 'comcastdotcomqa';
    } else {
        s_account = 'comcastdotcomprod';
    }
}

var s = s_gi(s_account)
/************************** CONFIG SECTION **************************/
s.currencyCode = "USD"
s.charSet = "UTF-8"
s.trackDownloadLinks = true
s.trackExternalLinks = true
s.trackInlineStats = true
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
//any edits to the s.linkInternalFilters will need a change in the s_account variable setting as done above
s.linkInternalFilters = "javascript:,comcast.com,comcast.convergentcare.com,comcastvoices.com,localhost,cc01user,cc02user,stage-user-comcastcom,comcomdev02.bos3.fastsearch.net,comcomstg.bos3.fastsearch.net,xfinity.com,comcastsupport.com"
s.linkLeaveQueryString = false
s.linkTrackVars = "prop24,prop17"
s.linkTrackEvents = "None"

/*Form Analysis configuration Variables */
s.formList = "Main,QASet,CustInfoForm,ProInstallForm,form1" /*Make sure that you have correct form names here*/
s.trackFormList = true
s.trackPageName = true
s.useCommerce = true
s.varUsed = "eVar8"
s.eventList = "event2" //Abandon

/* Get Page name Variables */
s.siteID = ""            // leftmost value in pagename
s.defaultPage = ""       // filename to add when none exists
s.queryVarsList = ""     // query parameters to keep
s.pathExcludeDelim = ";" // portion of the path to exclude
s.pathConcatDelim = " - "   // page name component separator
s.pathExcludeList = ""   // elements to exclude from the path

/*channel Manager */
s._channelParameter = "DFA|dfaid>Email Marketing|MID"
s._channelPattern = "Affiliate|AFC>Banner Ad|BAC>Classified Ad|CAC>Direct Mail|DMC>Email Marketing|EMC>EXT-Internal|ILC>Keyword|KNC>Keyword|CMC>PURL|BE"

/* Passing CustomerID to the Foresee Results Page */
if (typeof (ForeSee) != "undefined") {
    var userId = GetCookie('UserID');
    if (userId != "" && userId != "undefined") {
        ForeSee.CPPS.fsr$set('CustomerID', userId);
    }
}

s.addToCart = function (p, i) {
    var s = this;
    s.events = i > 0 ? "scAdd" : "scAdd,scOpen";
    s.products = ";" + p;
    s.linkTrackVars = "events,products";
    s.linkTrackEvents = s.events;
    s.tl(true, "o", "Add to Cart");
};

s.removeFromCart = function (p) {
    var s = this;
    s.events = "scRemove";
    s.products = ";" + p;
    s.linkTrackVars = "events,products";
    s.linkTrackEvents = s.events;
    s.tl(true, "o", "Remove From Cart");
};

/* Passing CustomerID to the Foresee Results Page */
function queryString(name) {
    var fullQueryString = window.location.search.substring(1);
    var checkQueryString = unescape(fullQueryString);
    if (checkQueryString != fullQueryString) {
        fullQueryString = checkQueryString;
    }
    var splitQueryString = fullQueryString.split("&");
    for (i = 0; i < splitQueryString.length; i++) {
        var nameValuePair = splitQueryString[i].split("=");
        if (nameValuePair[0].toLowerCase() == name.toLowerCase()) {
            return nameValuePair[1];
        }
    }
}

//function to get Page Name
function GetPageName(location) {
    var pageURL = location;
    var httpProtocol = "http://";
    var httpsProtocol = "https://";

    var startPosition = httpProtocol.length;
    var index = pageURL.indexOf(httpProtocol);
    if (index < 0) {
        index = pageURL.indexOf(httpsProtocol);
        startPosition = httpsProtocol.length;
    }
    if (index < 0)
        return;

    pageURL = pageURL.substring(index + startPosition);
    pageURL = pageURL.substring(pageURL.indexOf("/"));

    var pageNameResult = pageURL.split("/");   // split the directory first
    var finalPageNameResult = "";

    if (pageNameResult.length > 0) {
        var i = 0;
        for (i = 0; i < pageNameResult.length; i++) {
            if (pageNameResult[i] != "") {
                if (pageNameResult[i].indexOf(".") != -1) {   // if there are "."
                    var temp = pageNameResult[i].split(".");
                    finalPageNameResult += temp[0] + " - ";
                }
                else {
                    finalPageNameResult += pageNameResult[i] + " - ";
                }
            }
        }
        if (finalPageNameResult != "") {
            finalPageNameResult = finalPageNameResult.substring(0, finalPageNameResult.length - 2).toLowerCase();
        }
    }
    return finalPageNameResult;
}

/* DynamicObjectIDs config */
function s_getObjectID(o) {
    var ID = o.href;
    return ID;
}
s.getObjectID = s_getObjectID

/* Plugin Config */
s.usePlugins = true

function s_doPlugins(s) {

    /* Allant integration testing */
    s.eVar51 = s.getQueryParam('mid'); //allant link ID
    s.eVar52 = s.getQueryParam('rid'); //allant recipient ID
    s.campaign = s.eVar53 = (s.eVar51 + '').substring(0, s.eVar51.indexOf('^')); //trim to get message ID

    s.eVar54 = s.getQueryParam('IQ_ID');
    s.eVar55 = s.crossVisitParticipation(s.eVar54, 's_iqid', '30', '6', '>', 'purchase');
    s.eVar66 = s.getQueryParam('TargetId'); // Targetted IDs

    var _buyflow_events = ['event17', 'event18', 'event19', 'event34', 'event35', 'event36', 'event37', 'event39'];
    var _ev = (s.events + '').split(',');
    s.events = '';
    for (var _i = 0; _i < _ev.length; _i++) {
        for (var _n = 0; _n < _buyflow_events.length; _n++) {
            if (_ev[_i] == _buyflow_events[_n]) {
                _ev[_i] += s.purchaseID ? (':' + s.purchaseID) : '';
            }
        }
        s.events += _ev[_i] + ',';
    }
    s.events = s.events.substring(0, s.events.length - 1);


    /* If no PageName, here is the default */
    if (!s.pageType && !s.pageName) {
        s.pageName = s.getPageName();
        s.periodStart = s.pageName.indexOf('.');
        s.pageName = s.pageName.substring(0, s.periodStart);
    }
    s.pageName = s.pageName.toLowerCase();

    /*Do not move eVar31 from this location. eVar31 must be set before anything else*/
    s.eVar31 = "D=pageName";
    s.eVar37 = "D=pageName";

    /* get the search terms (if they are not already set */
    if (!s.eVar41) s.eVar41 = s.getQueryParam('q')
    if (s.eVar41) {
        s.eVar41 = s.prop41 = s.eVar41.toLowerCase();

        /*Internal Search Tracking : Search Refinement */
        s.eVar5 = s.crossVisitParticipation(s.prop41, 's_v5', '1', '10', '|', '');

        s.prop41 = "D=v41";
        s.t_search = s.getValOnce(s.eVar41, 'ev41', 0);
        s.eVar42 = 'D="' + s.eVar42 + ' : "+v41';

        if (s.events.indexOf("event9") > -1) s.events = s.repl(s.events, ",event9", "");

        /*Handles multiple tabbed search tracking*/
        if (s.t_search) s.events = s.apl(s.events, "event9,event10", ",", 2);

        if (!s.t_search) s.events = s.apl(s.events, "event10", ",", 2);
    }

    s._searchTerms = s.getAndPersistValue(s.eVar41, 'stc18', 0);
    if (!s.prop18 && s._searchTerms) s.prop18 = 'D="' + s._searchTerms + ' - "+ pageName';

    /* FormAnalysis 2.0	*/
    s.setupFormAnalysis();

    /* Set Page View Event */
    s.events = s.apl(s.events, 'event11', ',', 2);

    /* Campaign Pathing */
    if (s.campaign) { s.prop15 = 'D=v0+":"+pageName'; }
    else { s.prop15 = "D=pageName" }

    /* To setup Dynamic Object IDs */
    s.setupDynamicObjectIDs();

    /* Channel Stacking and treat natural search as a campaign*/
    s.channelManager('cmp,dfaid,mid', '', '0');


    if (s._channel == "Paid Non-Search") { s._channel = s._campaign.substring(0, 3) }

    if (!s.campaign && s._channel == "Natural Search") s.campaign = s._campaign + " organic"
    if (!s.campaign) s.campaign = s._campaignID
    //Need N/A for consistent keyword reporting/allocation
    if (s.campaign) s.eVar17 = s._keywords;

    /*Internal Link Tracking*/
    if (!s.eVar45) s.eVar45 = s.getQueryParam('intcmp')
    s.eVar45 = s.getValOnce(s.eVar45, "s_v45", 0)

    //clear out channel if internal or external
    if (s.eVar45) { s._channel = "" }
    if (s._channel && s._channel.toString().toLowerCase() == "external") { s._channel = "" }

    /*This uses the crossVisitParticipation plugin for channel stacking*/
    s.eVar9 = s.crossVisitParticipation(s._channel, 's_cpm', '30', '6', '>', 'purchase');

    /* entry bounce rate tracking for campaigns */
    s.clickThruQuality2('event20', 'event21')

    /*Call to TNT integration Plugin*/
    s.tnt = s.trackTNT();

    /*This will be used for all tracking, not just legacy buyflow*/
    if (s.prop7) { s.prop22 = 'D=pageName+"-"+c7'; }

    //Category
    if (!s.eVar32 && s.prop32) s.eVar32 = "D=c32";
    if (s.eVar32 && !s.prop32) s.prop32 = "D=v32";

    if (s.eVar32 && s.prop32) {
        if (s.eVar32 === s.prop32) s.eVar32 = "D=c32";
    }

    //Site
    s.prop33 = "comcast.com"
    s.eVar33 = "D=c33";

    //Section
    if (!s.eVar34 && !s.prop34 && s.channel) s.eVar34 = s.prop34 = "D=ch";
    if (s.eVar34 && !s.prop34 && !s.channel) s.channel = s.prop34 = "D=v34";
    if (!s.eVar34 && s.prop34 && !s.channel) s.channel = s.eVar34 = "D=c34";

    if (s.eVar34 && s.prop34 && !s.channel) s.channel = "D=c34";
    if (!s.eVar34 && s.prop34 && s.channel) s.eVar34 = "D=c34";
    if (s.eVar34 && !s.prop34 && s.channel) s.prop34 = "D=ch";

    if (s.eVar34 && s.prop34) {
        if (s.eVar34 == s.prop34 && !(s.eVar34.indexOf('D=') > -1)) s.eVar34 = "D=c34";
    }

    //Sub Section
    if (!s.eVar35 && s.prop35) s.eVar35 = "D=c35";
    if (s.eVar35 && !s.prop35) s.prop35 = "D=v35";

    if (s.eVar35 && s.prop35) {
        if (s.eVar35 === s.prop35) s.eVar35 = "D=c35";
    }

    //Page Type
    if (!s.eVar36 && s.prop36) s.eVar36 = "D=c36";
    if (s.eVar36 && !s.prop36) s.prop36 = "D=v36";

    if (s.eVar36 && s.prop36) {
        if (s.eVar36 === s.prop36) s.eVar36 = "D=c36";
    }

    //Copy and dynamically shorten other props to eVars
    if (!s.eVar2 && s.prop2) s.eVar2 = "D=c2";
    if (s.eVar2 && s.prop2) {
        if (s.eVar2 === s.prop2) s.eVar2 = "D=c2";
    }
    if (!s.eVar4 && s.prop4) s.eVar4 = "D=c4";
    if (!s.eVar11 && s.prop8) s.eVar11 = "D=c8";

    if (!s.eVar12 && s.prop10) s.eVar12 = "D=c10";
    if (s.eVar12 && s.prop10) {
        if (s.eVar12 === s.prop10) s.eVar12 = "D=c10";
    }

    if (!s.eVar13 && s.prop12) s.eVar13 = "D=c12";

    if (!s.eVar10 && s.prop7) s.eVar10 = "D=c7";

    if (s.eVar10 && s.prop7) {
        if (s.eVar10 === s.prop7) s.eVar10 = "D=c7";
    }

    if (!s.eVar50 && s.prop50) s.eVar50 = "D=c50";
    if (s.eVar50 && s.prop50) {
        if (s.eVar50 === s.prop50) s.eVar50 = "D=c50";
    }

    //Partners
    s.prop37 = "com";

    /*Get and Persist Zip Code*/
    s.prop4 = s.eVar4 = s.getAndPersistValue(s.prop4, 'omzip', 0);

    /*set eVar7 to previous value if on a localization page*/
    var p_page = s.getPreviousValue(s.pageName, 'gpv_07', '');

    if (s.pageName.indexOf('localization') > -1) s.eVar7 = p_page;
    if (p_page.indexOf('localization') > -1) s.eVar7 = ""

    //Copy purchaseID to transactionID and prop21 then truncate to 20 characters
    if (s.purchaseID) {
        s.transactionID = s.purchaseID;
        s.prop21 = "D=xact";
        s.purchaseID = (s.purchaseID + '').slice(0, 20)
    }

    if (p_page != undefined && p_page) {
        if (s.eVar26) {
            s.eVar26 = p_page + ":" + s.eVar26;
        }
    }

    /*handles setting the proper external referrer for xfinity pages*/
    if (s.getQueryParam('xintcmp') && document.referrer.indexOf('xfinity.com') > -1) s.referrer = "externalxfinity"

    s.hier3 = "D=MYPORTAL";

    /* dedupe the traffic sources reports */
    s.referrer = s.dedupeReferrers();

    /*New Time Parting*/
    s.eVar43 = s.prop43 = s.TimeParting('h', '-5') + ' - ' + s.TimeParting('d', '-5') + ' - ' + s.TimeParting('w', '-5');


    /*Account for exit links not on xfinity.com*/
    if (!(document.URL.indexOf('xfinity.com') > -1)) {
        var url = s.linkHandler('business.comcast.com|comcast.net|fancast.com|comcastsupport.com', 'e');
        if (url.indexOf('business.comcast.com') > -1) s.linkName = "exit to business class link";
    }

    s.socialPlatforms('eVar58');
}
s.doPlugins = s_doPlugins

/************************** PLUGINS SECTION *************************/

/*
* Plugin: socialPlatforms v1.0
*/
s.socialPlatforms = new Function("a", ""
+ "var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+ "toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+ "D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");
s.socPlatList = "facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga";

/*  
 * socialAuthors v1.3
 */
s.socialAuthors=new Function("",""
+"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
+"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
+"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar59';s.Integrate"
+".SocialAuthor.get('search.twitter.com/search.json?var=[VAR]&"
+"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
+".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
+"){s[p.tEvar]=s.user;}}");
s.twitterSearch=new Function("obj",""
+"var s=this,txt,txtRT,txtEnd,txtAuthor;txt=obj.results[0].text;txtRT"
+"=txt.indexOf('RT @');if(txtRT!=-1){txtEnd=txt.indexOf(' ',txtRT+4);"
+"txtAuthor=txt.substring(txtRT+4,txtEnd);s.user=txtAuthor.replace(':"
+"','');}else{s.user=obj.results[0].from_user;}s.Integrate.SocialAuth"
+"or.ready();");

/* Function - read combined cookies v 0.3*/
if (!s.__ccucr) {
    s.c_rr = s.c_r; s.__ccucr = true;
    s.c_r = new Function("k", ""
+ "var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+ "urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+ "c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+ ",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+ "m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+ "Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+ "urn v;");
}


/* Function - write combined cookies v 0.3*/
if (!s.__ccucw) {
    s.c_wr = s.c_w; s.__ccucw = true;
    s.c_w = new Function("k", "v", "e", ""
+ "this.new2 = true;"
+ "var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+ "c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+ ".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+ "ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+ ".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+ "ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+ "{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+ "='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+ ".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+ "ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+ "Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");
}


/* Click Through Quality 2- (this has been altered to look for the 
campaign variable instead of querystring parameters) */
s.clickThruQuality2 = new Function("tcth_ev", "cp_ev", "cff_ev", "cf_th", ""
+ "var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
+ "ts+',':'';if(s.getQueryParam&&s.campaign){s.events=ev+tct"
+ "h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
+ ",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
+ "_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
+ "+cp_ev;}}}");
s.p_fo = new Function("n", ""
+ "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+ "new Object;return 1;}else {return 0;}");

/*
* channelManager v2.45 - Tracking External Traffic
*/
s.channelManager = new Function("a", "b", "c", "d", "e", "f", ""
+ "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+ "X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+ "e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+ "?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+ "Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+ "nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+ "+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+ "'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+ ";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+ "ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+ "repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+ "i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+ ";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+ "{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+ ");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+ "++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+ "O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+ "se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+ "!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+ "etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+ "length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+ ".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+ "(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+ ".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+ "r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+ "._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+ "++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+ "T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+ "==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+ "t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+ "P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+ "O;s._campaign=u;s._keywords=M;s._channel=P;");
/* Top 130 Search Engines - Grouped */
s.seList = "altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc."
+ "de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum."
+ "net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Goo"
+ "gle>icqit.com|q|icq>bing.com|q|Bing>myway.com|searchfor|MyWay.com>n"
+ "aver.com,search.naver.com|query|Naver>netscape.com|query,search|Net"
+ "scape Search>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcso"
+ "k.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query|Tiscali>vi"
+ "rgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>yandex|text"
+ "|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net"
+ "|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.c"
+ "om|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/* Plugin: getPageName v2.1 - parse URL and return */
s.getPageName = new Function("u", ""
+ "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+ "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+ "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+ "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+ "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+ "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+ "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+ "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+ ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+ "ubstring(x+1)}return n");


/* Utility Function: p_c */
s.p_c = new Function("v", "c", ""
+ "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+ "ngth:x).toLowerCase()?v:0");


/* Plugin: getAndPersistValue 0.3 - get a value on every page */
s.getAndPersistValue = new Function("v", "c", "e", ""
+ "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+ "v)s.c_w(c,v,e?a:0);return s.c_r(c);");


/* Plugin: setupLinkTrack 2.0 */
s.setupLinkTrack = new Function("vl", "c", ""
+ "var s=this;var l=s.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s."
+ "c_r(c);if(vl&&cv!=''){cva=s.split(cv,'^^');vla=s.split(vl,',');for("
+ "x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s.c_w(c,'',0);if(!s.e"
+ "o&&!s.lnk)return '';o=s.eo?s.eo:s.lnk;y=s.ot(o);n=s.oid(o);if(s.eo&"
+ "&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"
+ ":o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);}for(i=0;i<4;i++"
+ ")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"
+ "ase()!='area')o=o.parentElement;}b=s._LN(o);o.lid=b[0];o.lpos=b[1];"
+ "if(s.hbx_lt&&s.hbx_lt!='manual'){if((o.tagName&&s._TL(o.tagName)=='"
+ "area')){if(!s._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"
+ "id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s._IL(o.lpos))"
+ "o.lpos=o.coords}else{if(s._IL(o.lid)<1)o.lid=s._LS(o.lid=o.text?o.t"
+ "ext:o.innerText?o.innerText:'');if(!s._IL(o.lid)||s._II(s._TL(o.lid"
+ "),'<img')>-1){h=''+o.title?o.title:o.innerHTML;bu=s._TL(h);i=s._II(bu,'<img');if(bu"
+ "&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"
+ ";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"
+ "i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l"
+ "=s.linkName?s.linkName:s._hbxln(h);t=s.linkType?s.linkType.toLowerC"
+ "ase():s.lt(h);oc=o.onclick?''+o.onclick:'';cv=s.pageName+'^^'+o.lid"
+ "+'^^'+s.pageName+' | '+(o.lid=o.lid?o.lid:'no &lid')+'^^'+o.lpos;if"
+ "(t&&(h||l)){cva=s.split(cv,'^^');vla=s.split(vl,',');for(x in vla)s"
+ "._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if(!t&&oc.indexOf('.tl(')<"
+ "0){s.c_w(c,cv,0);}else return ''");
s._IL = new Function("a", "var s=this;return a!='undefined'?a.length:0");
s._II = new Function("a", "b", "c", "var s=this;return a.indexOf(b,c?c:0)"
);
s._IS = new Function("a", "b", "c", ""
+ "var s=this;return b>s._IL(a)?'':a.substring(b,c!=null?c:s._IL(a))");
s._LN = new Function("a", "b", "c", "d", ""
+ "var s=this;b=a.href;b+=a.name?a.name:'';c=s._LVP(b,'lid');d=s._LVP("
+ "b,'lpos');r"
+ "eturn[c,d]");
s._LVP = new Function("a", "b", "c", "d", "e", ""
+ "var s=this;c=s._II(a,'&'+b+'=');c=c<0?s._II(a,'?'+b+'='):c;if(c>-1)"
+ "{d=s._II(a,'&',c+s._IL(b)+2);e=s._IS(a,c+s._IL(b)+2,d>-1?d:s._IL(a)"
+ ");return e}return ''");
s._LS = new Function("a", ""
+ "var s=this,b,c=100,d,e,f,g;b=(s._IL(a)>c)?escape(s._IS(a,0,c)):esca"
+ "pe(a);b=s._LSP(b,'%0A','%20');b=s._LSP(b,'%0D','%20');b=s._LSP(b,'%"
+ "09','%20');c=s._IP(b,'%20');d=s._NA();e=0;for(f=0;f<s._IL(c);f++){g"
+ "=s._RP(c[f],'%20','');if(s._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"
+ "rn unescape(b)");
s._LSP = new Function("a", "b", "c", "d", "var s=this;d=s._IP(a,b);return d"
+ ".join(c)");
s._IP = new Function("a", "b", "var s=this;return a.split(b)");
s._RP = new Function("a", "b", "c", "d", ""
+ "var s=this;d=s._II(a,b);if(d>-1){a=s._RP(s._IS(a,0,d)+','+s._IS(a,d"
+ "+s._IL(b),s._IL(a)),b,c)}return a");
s._TL = new Function("a", "var s=this;return a.toLowerCase()");
s._NA = new Function("a", "var s=this;return new Array(a?a:0)");
s._hbxm = new Function("m", "var s=this;return (''+m).indexOf('{')<0");
s._hbxln = new Function("h", "var s=this,n=s.linkNames;if(n)return s.pt("
+ "n,',','lnf',h);return ''");

/* Link Tracking*/
s.hbx_lt = "auto" // manual, auto
s.setupLinkTrack("prop17,prop24,,", "SC_LINKS");


/* Plugin: getQueryParam 2.3 */
s.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+ "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return ''");



/* Utility Function: split v1.5 - split a string (JS 1.0 compatible) */
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


/* Plugin Utility: apl v1.1 */
s.apl = new Function("L", "v", "d", "u", ""
+ "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)L=L?L+d+v:v;return L");


/* Plugin: getValOnce 0.2 -  */
s.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");


/* Plugin: Form Analysis 2.1 (Abandonment) */
s.setupFormAnalysis = new Function(""
+ "var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+ "wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+ "tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+ ",'','')}");
s.sendFormEvent = new Function("t", "pn", "fn", "en", ""
+ "var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+ "s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol = new Function("e", ""
+ "var s=s_c_il[" + s._in + "],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+ "event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+ "th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+ ";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+ "if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+ "No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+ "s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+ "mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+ "g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+ "=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+ ".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos = new Function("e", ""
+ "var s=s_c_il[" + s._in + "],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+ "u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+ "e;");
s.fasl = new Function("e", ""
+ "var s=s_c_il[" + s._in + "],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+ "eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+ "name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+ "'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+ "='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+ "!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+ "ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+ "ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+ "e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+ ",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+ ".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+ "vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+ "();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+ "ePlugins=up}if(typeof(e)!='undefined'){return f.ul&&e!='e'&&e!='s'?"
+ "f.ul(e):true;}else return true;");
s.fam = new Function("e", ""
+ "var s=s_c_il[" + s._in + "],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+ "tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+ "form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+ "which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+ "N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+ "AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+ "n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+ "){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+ "1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+ "_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+ "d(e);");
s.ee = new Function("e", "n", ""
+ "return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage = new Function("e", "a", ""
+ "var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");


/* Utility Function: vpr - set the variable vs with value v*/
s.vpr = new Function("vs", "v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");


/* Plugin Utility: Replace v1.0*/
s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");


/*	Plug-in: crossVisitParticipation v1.5  */
s.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", ""
+ "var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+ " ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+ "ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+ "f(!v||v=='')return '';v=escape(v);var arry=new Array(),a=new Array("
+ "),c=s.c_r(cn),g=0,h=new Array();if(c&&c!='')arry=eval(c);var e=new "
+ "Date();e.setFullYear(e.getFullYear()+5);if(dv==0 && arry.length>0 &"
+ "& arry[arry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getT"
+ "ime()];else arry[arry.length]=[v, new Date().getTime()];var start=a"
+ "rry.length-ct<0?0:arry.length-ct;var td=new Date();for(var x=start;"
+ "x<arry.length;x++){var diff=Math.round((td.getTime()-arry[x][1])/86"
+ "400000);if(diff<ex){h[g]=unescape(arry[x][0]);a[g]=[arry[x][0],arry"
+ "[x][1]];g++;}}var data=s.join(a,{delim:',',front:'[',back:']',wrap:"
+ "\"'\"});s.c_w(cn,data,e);var r=s.join(h,{delim:dl});if(ce) s.c_w(cn"
+ ",'');return r;");


/* s.join: 1.0 - s.join(v,p)*/
s.join = new Function("v", "p", ""
+ "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL*/
s.setupDynamicObjectIDs = new Function(""
+ "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+ ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+ " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+ "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+ "re=1}");
s.setOIDs = new Function("e", ""
+ "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+ ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+ "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+ "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+ "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+ "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+ "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+ ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+ "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+ "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");
/* TNT Integration Plugin v1.0*/
s.trackTNT = new Function("v", "p", "b", ""
+ "var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+ "getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+ "]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/* dedupe referrers */
s.dedupeReferrers = new Function("c", "b", ""
+ "var s=this,a,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.refer"
+ "rer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):g.le"
+ "ngth;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.s"
+ "plit(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:'';i"
+ "f(n)o=n}if(!o){c=c?c:'_dr';b=b?b-1:'1';a=g;a=s.getValOnce(a,c,0);if"
+ "(a){return a}else{return k[b]}}}");

/*
* Plugin: getPreviousValue_v1.0 - return previous value of designated
*   variable (requires split utility)
*/
s.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*Time Parting modified to report every minute*/
s.TimeParting = new Function("t", "z", ""
+ "var s=this,d,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;d=new Date();A"
+ "=d.getFullYear();if(A=='2009'){B='08';C='01'}if(A=='2010'){B='14';C"
+ "='07'}if(A=='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A="
+ "='2013'){B='10';C='03'}if(A=='2014'){B='09';C='02'}if(!B||!C){B='08"
+ "';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000');if("
+ "D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=p"
+ "arseFloat(z);E=new Date(B);F=new Date(C);G=F;H=new Date();if(H>E&&H"
+ "<G){z=z+1}else{z=z};I=H.getTime()+(H.getTimezoneOffset()*60000);J=n"
+ "ew Date(I+(3600000*z));K=['Sunday','Monday','Tuesday','Wednesday','"
+ "Thursday','Friday','Saturday'];L=J.getHours();M=J.getMinutes();N=J."
+ "getDay();O=K[N];P='AM';Q='Weekday';if(M<10){R='0'+M}else{R=M}if(L>="
+ "12){P='PM';L=L-12};if(L==0){L=12};if(N==6||N==0){Q='Weekend'}T=L+':"
+ "'+R+P;if(t=='h'){return T}if(t=='d'){return O}if(t=='w'){return Q}}");

/*
* Utility Function: p_gh
*/
s.p_gh = new Function(""
+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+ "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+ "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+ "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
* Plugin: linkHandler 0.5 - identify and report custom links
*/
s.linkHandler = new Function("p", "t", ""
+ "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+ "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+ "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+ "e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn = new Function("t", "h", ""
+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+ "return 0;");

/*
* Utility Function: vpr - set the variable vs with value v
*/
s.vpr = new Function("vs", "v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
* Plugin Utility: Replace v1.0
*/
s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/************************** DFA VARIABLES **************************/
/* @TODO: Fill in these variables with the settings mapped in the 
* DFA wizard and that match your desired preferences. Some of the 
* variables are optional and have been labeled as such below. */

var dfa_CSID = '1516422'; // DFA Client Site ID
var dfa_SPOTID = '2199899'; // DFA Spotlight ID
var dfa_tEvar = 'eVar22'; // transfer variable, typically the "View Through" eVar.
var dfa_errorEvar = ''; // DFA error tracking (optional)
var dfa_timeoutEvent = ''; // Tracks timeouts/empty responses (optional)
var dfa_requestURL = "http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]"; // the DFA request URL
s.maxDelay = "750" // maximum time to wait for DFA, in milliseconds

var dfa_visitCookie = "s_dfa"; // The name of the visitor cookie to use to restrict DFA calls to once per visit.
var dfa_overrideParam = "CID"; // A query string paramter that will force the DFA call to occur.
var dfa_newRsidsProp; //="prop34"; // Stores the new report suites that need the DFA tracking code. (optional)
/************************ END DFA Variables ************************/

s.loadModule("Integrate")
s.Integrate.onLoad = function (s,m) {

    s.socialAuthors();

    var dfaCheck = s.partnerDFACheck(dfa_visitCookie, dfa_overrideParam, dfa_newRsidsProp);
    if (dfaCheck) {
        s.Integrate.add("DFA");
        s.Integrate.DFA.tEvar = dfa_tEvar;
        s.Integrate.DFA.errorEvar = dfa_errorEvar;
        s.Integrate.DFA.timeoutEvent = dfa_timeoutEvent;
        s.Integrate.DFA.CSID = dfa_CSID;
        s.Integrate.DFA.SPOTID = dfa_SPOTID;
        s.Integrate.DFA.get(dfa_requestURL);
        s.Integrate.DFA.setVars = function (s, p) {
            if (window[p.VAR]) { // got a response
                if (!p.ec) { // no errors
                    s[p.tEvar] = "DFA-" + (p.lis ? p.lis : 0) + "-" + (p.lip ? p.lip : 0) + "-" + (p.lastimp ? p.lastimp : 0) + "-" + (p.lastimptime ? p.lastimptime : 0) + "-" + (p.lcs ? p.lcs : 0) + "-" + (p.lcp ? p.lcp : 0) + "-" + (p.lastclk ? p.lastclk : 0) + "-" + (p.lastclktime ? p.lastclktime : 0)
                } else if (p.errorEvar) { // got an error response, track
                    s[p.errorEvar] = p.ec;
                }
            } else if (p.timeoutEvent) { // empty response or timeout
                s.events = ((!s.events || s.events == '') ? '' : (s.events + ',')) + p.timeoutEvent; // timeout event
            }
        }
    }
}

/*
* Partner Plugin: DFA Check 0.9 - Restrict DFA calls to once a visit,
* per report suite, per click through. Used in conjunction with VISTA
*/
s.partnerDFACheck = new Function("c", "src", "p", ""
+ "var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+ "ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+ "_r(c);if(cr){v=0;}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<a"
+ "a.length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1"
+ ";}}if(!fnd){cs[cn]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k"
+ "++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}q="
+ "s.wd.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf("
+ "'&'+src.toLowerCase()+'=');if(g>-1){s.vpr(p,cr);v=1;}if(!s.c_w(c,cr"
+ ",t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}return v>=1;");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
s.visitorNamespace = "comcastcom"
s.trackingServer = "serviceo.comcast.net"
s.trackingServerSecure = "serviceos.comcast.net"
s.dc = 112

/****************************** MODULES *****************************/
/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z)u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y}}}return u};m.get=function(u,v){var p"
+"=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p."
+"_d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=func"
+"tion(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integ"
+"rate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;"
+"if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code = '', s_objectID; function s_gi(un, pg, ss) {
    var c = "s.version='H.24.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+ "\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+ "n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+ "<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+ "pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+ ".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+ "%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+ "{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+ "ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+ "=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+ " s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l="
+ "s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilitySta"
+ "te;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,"
+ "c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'"
+ "}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){v"
+ "ar s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf"
+ "('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':"
+ "s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='N"
+ "ONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString"
+ "()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i"
+ "].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.a"
+ "pv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.w"
+ "d,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c"
+ "=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tf"
+ "s=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=thi"
+ "s,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s."
+ "trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.ne"
+ "t';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mob"
+ "ile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if"
+ "(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;"
+ "r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_"
+ "il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dl"
+ "n<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-"
+ "b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf="
+ "function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='"
+ "',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+="
+ "8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if"
+ "(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c='"
+ "'}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\""
+ ";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nf"
+ "l.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substr"
+ "ing(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f"
+ ".indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')s"
+ "k='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=f"
+ "unction(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrac"
+ "kEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',e"
+ "vents,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf"
+ "(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=="
+ "'referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visit"
+ "orMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visit"
+ "orNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';el"
+ "se if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else i"
+ "f(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=="
+ "'events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSe"
+ "conds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';els"
+ "e if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier"
+ "'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0"
+ "?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s"
+ ".lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lf"
+ "t,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','v"
+ "ar s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cpp"
+ "XYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=functi"
+ "on(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l"
+ ".protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o)"
+ "{var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type."
+ "toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&("
+ "!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o."
+ "value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s="
+ "this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return '"
+ "'};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('="
+ "'),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c"
+ "_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s"
+ ".sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Funct"
+ "ion('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0|"
+ "|oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachE"
+ "vent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplin"
+ "gGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=fu"
+ "nction(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))re"
+ "turn n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLower"
+ "Case)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',argument"
+ "s))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s."
+ "m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il"
+ "','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]]"
+ ")r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",a"
+ "rguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if(("
+ "\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)f"
+ "or(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){"
+ "if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g["
+ "i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.subs"
+ "tring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_"
+ "c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.m"
+ "axDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.t"
+ "ype=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o"
+ "=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=funct"
+ "ion(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}"
+ "}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s."
+ "dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDel"
+ "ay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s"
+ ".track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt="
+ "tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',v"
+ "b=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn"
+ "=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new "
+ "Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v"
+ "=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if("
+ "s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage"
+ "(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}i"
+ "f(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidt"
+ "h=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.documen"
+ "t.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o"
+ "),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.o"
+ "nclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.link"
+ "Name;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageUR"
+ "L;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape("
+ "t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referre"
+ "r=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if("
+ "s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,"
+ "i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i"
+ "];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml"
+ ")for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if"
+ "(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.loc"
+ "ation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6"
+ "=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer')"
+ ";s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=par"
+ "seFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpp"
+ "erCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+ "Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+ "deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+ "lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',"
+ "prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,jav"
+ "ascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,tra"
+ "ckingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExte"
+ "rnalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s."
+ "sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t("
+ ")};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w = window, l = w.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf('MSIE '), m = u.indexOf('Netscape6/'), a, i, j, x, s; if (un) { un = un.toLowerCase(); if (l) for (j = 0; j < 2; j++) for (i = 0; i < l.length; i++) { s = l[i]; x = s._c; if ((!x || x == 's_c' || (j > 0 && x == 's_l')) && (s.oun == un || (s.fs && s.sa && s.fs(s.oun, un)))) { if (s.sa) s.sa(un); if (x == 's_c') return s } else s = 0 } } w.s_an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    w.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+ "ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    w.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    w.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
    w.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+ "=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+ "x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    w.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    w.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+ "a");
    w.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+ "f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+ "'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    c = s_d(c); if (e > 0) { a = parseInt(i = v.substring(e + 5)); if (a > 3) a = parseFloat(i) } else if (m > 0) a = parseFloat(u.substring(m + 10)); else a = parseFloat(v); if (a < 5 || v.indexOf('Opera') >= 0 || u.indexOf('Opera') >= 0) c = s_ft(c); if (!s) { s = new Object; if (!w.s_c_in) { w.s_c_il = new Array; w.s_c_in = 0 } s._il = w.s_c_il; s._in = w.s_c_in; s._il[s._in] = s; w.s_c_in++; } s._c = 's_c'; (new Function("s", "un", "pg", "ss", c))(s, un, pg, ss); return s
}
function s_giqf() { var w = window, q = w.s_giq, i, t, s; if (q) for (i = 0; i < q.length; i++) { t = q[i]; s = s_gi(t.oun); s.sa(t.un); s.setTagContainer(t.tagContainerName) } w.s_giq = 0 } s_giqf()

try {
    mboxLoadSCPlugin(s);
    // Call 'SiteCatalyst: event' or 'SiteCatalyst: purchase' mbox with SC variables as mbox params
} catch (e) { }
