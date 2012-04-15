/****Customer: Home Depot 2008
/************ don't modify below this line *********
 *************  Version: Std 5.3 v.21 ***********
 ****** Copyright 2001-2008 ForeseeResults, Inc****/

/* Handle the document.domain issue */
var docDomainParts = document.domain.split('.'), docDomainPartsLen = docDomainParts.length;
if (docDomainPartsLen > 2) { document.domain = docDomainParts[docDomainPartsLen-2]+"."+docDomainParts[docDomainPartsLen-1]; }
docDomainPartsLen = docDomainParts = null;

/**MAIN PARAMETERS**/
if(!window.foresee) window.foresee = new Object();
foresee.triggerParms= new Array();
foresee.triggerParms["displayMode"] = 3;		 		    //0=disable survey, 1=Invitation when PUB present, 2=No Invitation, 3=Invitation Only
foresee.triggerParms["mid"] = "xdZRxxhkdkM1BU908wsR0A==";   // model instance id (Default is XYZ Company survey) - Comment if using 'sid'
foresee.triggerParms["cid"] = "ERcYlgQhMZgswME8lFVQJA==";   // customer id
foresee.triggerParms["lf"] = 6;		 	      	   			// loyalty factor
foresee.triggerParms["sp"] = 0.2;	 		      			// sampling percentage
foresee.triggerParms["rw"] = 129600; 	 		 			// duration of persistent survey shown cookie (value in minutes)
foresee.triggerParms["npc"] = 0; 	                		// 0-(default) persistent survey shown cookie, 1 - session
foresee.triggerParms["compliant508"] = 0;           		// 508 compliant if 1
//foresee.triggerParms["omb"] = "1505-0186";        		// uncomment if required
foresee.triggerParms["width"] = 450;			    		// survey width
foresee.triggerParms["height"] = 500;			   			// survey height
foresee.triggerParms["domain"] = "."+document.domain;	 	// domain name
foresee.triggerParms["dhtmlURL"] ="/static/scripts/fsrscripts/FSRInvite.html";

/**MISC PARAMETERS**/
//foresee.triggerParms["sid"] = "";							// e.g.: BROWSE|CHECKOUT|POS  - foresee defined survey identifier, default commented
//foresee.triggerParms["patternType"] = "";		   			// use either URL|CK=<paste_your_cookie_name>|VALUE as a lookup pattern, default commented
foresee.triggerParms["lfcookie"] = "ForeseeLoyalty";	    // loyalty cookie name
foresee.triggerParms["ascookie"] = "ForeseeSurveyShown";    // "survey shown" cookie name
foresee.triggerParms["olpu"] = 1;					// default 1, 0 will pop survey UNDER browser window
foresee.triggerParms["userURL"] = 1; 		      	// capture URL if 1
foresee.triggerParms["capturePageView"] = 1; 	  	// capture pages viewed if 1
//foresee.triggerParms["dcUniqueId"] = "TEST04JloZZN0k9cI1Ep5d"; //  (22 chars unique Id for double cookie I/II)
//foresee.triggerParms["midexp"] = 129600; 		  	// for double cookie (value in minutes)

/**DHTML PARAMETERS**/
foresee.triggerParms["dhtmlIndex"]= 10000;		// z-index s/b greater then client’s dhtml z-index (if exist) - default 100
foresee.triggerParms["dhtmlWidth"] = 650;		// invite page width
foresee.triggerParms["dhtmlHeight"]= 320;		// invite page height
foresee.triggerParms["dhtmlDelay"]= 100;		// default=1ms, invite timeout in millisecs
foresee.triggerParms["dhtmlHighlight"]= 0; 		// 1- enable dhtml lightbox effect, 0-disable
foresee.triggerParms["dhtmlOverlayBgClr"]= "#EFEFEF";	// default background div color
foresee.triggerParms["dhtmlOverlayOpacity"]= "0.85"; 	// default background div opacity

//DHTML Positioning
foresee.xPosition="CENTER";              //enter "CENTER", "LEFT", or "RIGHT" for horizontal positioning
foresee.yPosition="CENTER";              //enter "CENTER", "TOP", or "BOTTOM" for vertical positioning

/**FORESEE SYSTEM PARAMETERS**/
foresee.triggerParms["captureTriggerVersion"] = "STD5.3rel21";	// track latest trigger version
foresee.triggerParms["evtListener"]=1;				// default=1, register Poll as an event listener on body onload, 0 to call separately
foresee.triggerParms["useOneCookie"]= 1;			// drop one cookie if 1, separate cookies if 0
foresee.triggerParms["fsrCkSeparator"] = "||";		// Cookie values seperator
foresee.triggerParms["fsrParmSeparator"] = "=";		// parameters name value pair seperator
foresee.triggerParms["flashDetect"]= 0;				// set to 1 to prevent survey invitation on pages with flash
//display alert message on survey link if user has already surveyed
foresee.fsrMSG1= "Sorry, but you have already surveyed once - Thank you";	
foresee.cppUrlPatch = function cppUrlPatch(s) {var translated = ""; var i; var found = 0; for(i = 0; (found = s.indexOf(':', found)) != -1; ) {translated += s.substring(i, found) + "|"; i = found + 1; found++;} translated += s.substring(i, s.length); return translated;}

/*********************************
 **CLIENT PAGE SETUP PARAMETERS **
 *********************************/
/**CLIENT CPPS**/
//foresee.triggerParms["cpp_5"] = "cpp_name:"+ foresee.cppUrlPatch(cpp_value);		//uncomment & enter cpp_name/cpp_value

/**multi-language invite **/
//foresee.triggerParms['midEng']="";							//uncomment & enter english equivalent MID value here
//foresee.triggerParms['langCode']="";							//uncomment & enter foreign language code here 

/**multimeasure lookup table **/
//foresee.midLookupTable = new Array();
//foresee.midLookupTable["NAME"] ="[SP]:[MID]:[LF]";			//uncomment & enter page name, sampling %, MID and loyalty

/**multivendor lookup table **/
//foresee.vendorLookupTable = new Array();
//foresee.vendorLookupTable["NAME"]	 = "[SP]||[URL]";			//uncomment & define 3rd party vendor name, sampling % and path to code

/**page exclude list, do not show invite/tracker**/
//foresee.excludeList = new Array();
//foresee.excludeList[0]= "[NAME]";								//uncomment & add page names on which to exclude the invitation.

/**page referrer exclude list, do not show invite/tracker**/
//foresee.referrerList = new Array();
//foresee.referrerList[0]= "[NAME]";							//uncomment & add referrer page names on which to exclude the invitation.

/**click event Listener Tag List, add event listener on the tag list with matching string**/
//foresee.eventTagList = new Array();
//foresee.eventTagList["matchStr"]= "tag|event";				//uncomment & add tag name and event for a particular matching string in that URL property