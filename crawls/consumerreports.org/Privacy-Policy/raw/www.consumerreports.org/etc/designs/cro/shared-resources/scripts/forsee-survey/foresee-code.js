    var foreseeDomainName = "";
    var pageDomain = window.location.hostname;
    if(pageDomain.indexOf(".consumer.org") != -1){
        foreseeDomainName = ".consumer.org";
    }else{
        foreseeDomainName = ".consumerreports.org";
    }

    /**MAIN PARAMETERS**/
    if(!window.foresee) window.foresee = new Object();
    foresee.triggerParms= new Array();
    foresee.triggerParms["displayMode"] = 3;// 0=disable survey, 1=Invitation when PUB present, 2=NoInvitation, 3=Invitation Only
    foresee.triggerParms["mid"] = "wUkRkhgs4Vx0Ad18Bps10A==";
    foresee.triggerParms["cid"] = "9ZsskpQN9JUMQwIccdRkIg==";// customer id
    foresee.triggerParms["dLF"] = 3;
    // loyalty factor
    foresee.triggerParms["spL"] = 3.0;
    // sample percentage
    foresee.triggerParms["rw"] = 43200;// resample wait (value in minutes)
    foresee.triggerParms["npc"] = 0; // 0-default persistent cookies, 1 - session
    foresee.triggerParms["compliant508"] = 1; // 508 compliant if 1
    foresee.triggerParms["omb"] = "1505-0186"; // uncomment if required
    foresee.triggerParms["width"] = 450;// survey width
    foresee.triggerParms["height"] = 500;// survey height
    //foresee.triggerParms["domain"] = ".consumerreports.org";// domain name
    foresee.triggerParms["domain"] = foreseeDomainName;// domain name
    foresee.triggerParms["dhtmlURL"] ="/cro/application-resources/forsee-survey/oeFSRInvite.html"; //path tosurvey invitation
    /**ONEXIT PARAMETERS**/
    foresee.triggerParms["oeMode"]= 1;// onExit mode: 0=triggers survey on subdomain or protocol change,1=triggers survey on domain change only or in absence of code (default)
    foresee.triggerParms["sMode"] = 1; // survey mode: 1=preload survey, 0=load at exit
    foresee.triggerParms["dLFPreCheck"] = 1; // default 1, count page visit before opening Invite/Tracker,    otherwise 0 to count after
    foresee.triggerParms["trackerURL"] ="/cro/forsee-survey-tracker.htm"; //path to survey child
    /**MISC PARAMETERS**/
    //foresee.triggerParms["sid"] = "";// e.g.: BROWSE|CHECKOUT|POS - foresee defined survey identifier,   default commented
    //foresee.triggerParms["patternType"] = "";// use either URL|CK=<paste_your_cookie_name>|VALUE as a   lookup pattern, default commented
    foresee.triggerParms["lfcookie"] = "ForeseeLoyalty";// loyalty cookie name
    foresee.triggerParms["ascookie"] = "ForeseeSurveyShown";// "survey shown" cookie name
    foresee.triggerParms["olpu"] = 1;// default 1, 0 will pop survey UNDER browser window
    foresee.triggerParms["userURL"] = 1;// capture URL if 1
    foresee.triggerParms["capturePageView"] = 1;// capture pages viewed if 1
    //Double Cookie/1 settings
    //foresee.triggerParms["dcUniqueId"] = "TEST04JloZZN0k9cI1Ep5d";// (22 chars unique Id for double       cookie I/II)
    //foresee.triggerParms["midexp"] = 129600;// for double cookie (value in minutes)
    //foresee.triggerParms["nLF"] = 0; // navigation loyalty factor, commented by default
    foresee.triggerParms["spE"] = 100.0;// execute sample percentage
    /**DHTML PARAMETERS**/
    foresee.triggerParms["dhtmlIndex"]= 10000;// z-index s/b greater then client's dhtml z-index (if exist) -         default 100
    foresee.triggerParms["dhtmlWidth"] = 450;// invite page width
    foresee.triggerParms["dhtmlHeight"]= 290;// invite page height
    foresee.triggerParms["dhtmlDelay"]= 100;// default=1ms, invite timeout in millisecs
    foresee.triggerParms["dhtmlHighlight"]= 0; // 1- enable dhtml lightbox effect, 0-disable
    foresee.triggerParms["dhtmlOverlayBgClr"]= "#EFEFEF";// default background div color
    foresee.triggerParms["dhtmlOverlayOpacity"]= "0.85";// default background div opacity
    //DHTML Positioning
    foresee.xPosition="CENTER";//enter "CENTER", "LEFT", or "RIGHT" for horizontal positioning
    foresee.yPosition="CENTER";//enter "CENTER", "TOP", or "BOTTOM" for vertical positioning
    /**SCOUT TRACKER PARAMETERS**/
    foresee.triggerParms["trackerRetry"] = 2;// default=2, check multiple times if OE condition is true.
    foresee.triggerParms["trackerDelay"] = 1000;// default=1 sec, scout delay in millseconds.
    foresee.triggerParms["trackerWidth"] = 500;// child window Width
    foresee.triggerParms["trackerHeight"] = 325;// child window Height
    foresee.triggerParms["trackerThirdPartyCheck"] = 0;// check for 3rd party persistent cookie if 1, default 0         or disable
    foresee.triggerParms["trackerWinRep"] = 0;// drops 'ScoutClosed' ScoutRunning cookie if 0
    foresee.triggerParms["trackerExclude"]= 0;// If 1, tracker closes when exclude list requirement is met         (default 0)
    /**FORESEE SYSTEM PARAMETERS**/
    foresee.triggerParms["captureTriggerVersion"] = "OE7.3rel26";// track trigger version
    foresee.triggerParms["evtListener"]=1;// default=1, register tracker as an event listener on body onload, 0 to       call separately
    foresee.triggerParms["useOneCookie"]= 1;// drop one cookie if 1, separate cookies if 0
    foresee.triggerParms["fsrCkSeparator"] = "||";// Cookie values seperator
    foresee.triggerParms["fsrParmSeparator"] = "=";// parameters name value pair seperator
    foresee.triggerParms["flashDetect"]= 0; // set to 1 to prevent survey invitation on pages with flash
    //display alert message on survey link if user has already surveyed
    foresee.fsrMSG1= "Sorry, but you have already surveyed once - Thank you";
    /*********************************
    **CLIENT PAGE SETUP PARAMETERS **
    *********************************/
    /**CLIENT CPPS**/
    //foresee.triggerParms["oecpp_cppName"]="Foresee_cppName";//uncomment & enter cppName (in both        places)
    /**multi-language invite **/
    //foresee.triggerParms['midEng']="";//uncomment & enter english equivalent MID value here
    //foresee.triggerParms['langCode']="";//uncomment & enter foreign language code here
    /**multimeasure lookup table **/
    //foresee.midLookupTable = new Array();
    //foresee.midLookupTable["NAME"] ="[spL]:[MID]:[nLF]";//uncomment & enter page name, sampling %,       MID and loyalty
    /**multivendor lookup table **/
    //foresee.vendorLookupTable = new Array();
    //foresee.vendorLookupTable["NAME"] = "[spL]||[URL]";//uncomment & define 3rd party vendor name,        sampling % and path to code
    /**page exclude list, do not show invite/tracker**/
    //foresee.excludeList = new Array();
    //foresee.excludeList[0]= "[NAME]";//uncomment & add page names on which to exclude the invitation.
    /**page referrer exclude list, do not show invite/tracker**/
    //foresee.referrerList = new Array();
    //foresee.referrerList[0]= "[NAME]";//uncomment & add any value that exists in the referrer URL
    /**click event Listener Tag List, add event listener on the tag list with matching string**/
    //foresee.eventTagList = new Array();
    //foresee.eventTagList["matchStr"]= "tag|event";//uncomment & add tag name and event for a particular        matching string in that URL property
    /**page watch list, show survey when exiting from these pages**/
    foresee.watchList = new Array();//uncomment & add any value that exists in the URL
    foresee.watchList[0]= "/cro";
    // main landing page
