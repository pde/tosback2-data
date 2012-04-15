// Customer: Epinions.com
// Version : Standard 5.1
// Copyright 2001-2008 ForeseeResults, Inc

var triggerParms= new Array(); 
var excludeList = new Array();
var flashTagList= new Array();

/**MAIN PARAMETERS**/
triggerParms["displayMode"] = 3; //0=disable, 1=popup then dhtml, 2=popup only, 3=default dhtml only
triggerParms["mid"] = "ZRR0gtMtB4tdNkJlc0ds1w=="; // model instance id
triggerParms["cid"] = "0xUF5gMYMcA88xh5JEQ0gQ=="; // customer id
triggerParms["lf"] = 3; //domain loyalty factor
triggerParms["sp"] = 5.0; //  launch sample percentage
triggerParms["npc"] = 0; // no persistent cookies if 1
triggerParms["rw"] = 259200; // resample wait (value in minutes)
triggerParms["compliant508"] = 0; //508-JAWS compliant if 1
//triggerParms["omb"] = "1505-0186"; //uncomment if required
triggerParms["width"] = 450;
triggerParms["height"] = 500;
triggerParms["domain"] = ".epinions.com"; // domain name
triggerParms["dhtmlURL"] ="/fsrscripts/FSRInvite.html";

/**TESTING PARAMETERS**/
//triggerParms["lf"] = 0; //domain loyalty factor
//triggerParms["sp"] = 100.0; //  launch sample percentage
//triggerParms["npc"] = 1; // no persistent cookies if 1

/**MISC PARAMETERS**/
//triggerParms["sid"] = "";		// e.g.: BROWSE|CHECKOUT|POS  - case insensitive survey identifier, default commented
//triggerParms["patternType"] = "";	//use either URL|CK=<paste_your_cookie_name>|VALUE as a lookup pattern, default commented
triggerParms["lfcookie"] = "ForeseeLoyalty"		//default loyalty cookie name
triggerParms["ascookie"] = "ForeseeSurveyShown"		//default already shown cookie name
triggerParms["pu"] = 0;
triggerParms["userURL"] = 1; 	// value set to 1, if the client wants user url
triggerParms["capturePageView"] = 1;
//triggerParms["cmetrics"] = "90010257"; // coremetrics client id
triggerParms["visualScienceId"] = 0;	// enable visual science code if 1
triggerParms["omnitureId"] = 0;		// enable omniture code if 1
//excludeList[0] = "/exclude/"; //trigger script will not work under this path
//Double Cookie/1 settings
//triggerParms["dcUniqueId"] = "TEST04JloZZN0k9cI1Ep5d"; //  (22 chars unique Id for double cookie I/II)
//triggerParms["midexp"] = 129600; // for double cookie (value in minutes)
triggerParms["rso"]= 0; //user has chosen to use Retry Survey Option
triggerParms["aro"]= 0; //user has chosen to use Auto Retry Option, with SP=100
//triggerParms["rct"]= 1; //The maximum number of times allowed to serve a survey to a user
//triggerParms["rds"]= 1; //The minimum number of days to wait to serve a survey repeatedly
//triggerParms["mrd"]= 1; //The total number of days that a user can be re-served a survey


/**DHTML PARAMETERS**/
triggerParms["dhtmlIndex"]= 100;	// z-index s/b greater then client�s dhtml z-index (if exist) - default 100
triggerParms["dhtmlWidth"] = 400;	// welcome page width
triggerParms["dhtmlHeight"] = 290;	// welcome page height
//DHTML Positioning
//center		bottom-center		bottom-right		bottom-left          upper-right           upper-left
//x,y = (2,150)		x,y = (2,350)		x,y = (1.02,350)	x,y = (60,350)     x,y = (1.02,50)     x,y = (60,50)
//replace (x,y) below with any one of the above, default = center
var x=2;
var y=150;
triggerParms["dhtmlLeft"] = (self.screen.width - triggerParms["dhtmlWidth"])/x;			//invite page left position**DO NOT MODIFY**
triggerParms["dhtmlTop"] = Math.min((self.screen.height - triggerParms["dhtmlHeight"])/2,y);	//invite page top position**DO NOT MODIFY**

/**FLASH PARAMETERS - not to be used with other embedded objects e.g. (.dcr/.mov/.mpeg/.avi/.wma/.wmv/.aam/.rm/.ram)**/
triggerParms["flashDetect"]= 0;		// check if page has flash embedded with a valid browser & player ver before showing  dhtml - disable if 0
flashTagList[0]= "swf";			// flash src check for IE/NE complaint browsers
flashTagList[1]= "spl";			// splash src check for IE/NE complaint browsers
flashTagList[2]= "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";	//activeX ID check for IE browsers only
triggerParms["inviteDelay"]= 1000;	// invite timeout in millisecs - default 1000ms=1sec

/**MULTIPLE SURVEY VENDORS - uncomment variables below & add corresponding SP and URL **/
//var multiVendorSP= new Array();
//var multiVendorURL= new Array();
//multiVendorSP[0] = 0;		// sampling percentage for third-party vendor - disable if commented
//multiVendorURL[0]= "";	// absolute path to third-party script - disable if commented

/**FORESEE SYSTEM PARAMETERS**/
triggerParms["captureTriggerVersion"] = "STD5.1";	// track latest trigger version
function cppUrlPatch(s) {var translated = ""; var i; var found = 0; for(i = 0; (found = s.indexOf(':', found)) != -1; ) {translated += s.substring(i, found) + "|"; i = found + 1; found++;} translated += s.substring(i, s.length); return translated;}

/**CLIENT CPPS**/
//triggerParms["cpp_5"] = "cpp_name:"+ cppUrlPatch(cpp_value);		//uncomment & replace cpp_name/cpp_value
