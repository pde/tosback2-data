// -- START WebTrends --

//******************************************************************************************************  
//
// Use this special duplicate version of the base script in the header to handle events in which
// the script at the bottom loads too late. It will set a bypass flag after it writes to SDC and that will
// make it skip the second/bttom script so to avoiid duplicate hits.
//
//******************************************************************************************************  

//  DATE     MODIFICATION                                                                       Author
//=====================================================================================================
//  09/07/11:                                                                                  ms
//     1) Removed saFlowType processing
//     2) add processing for cookie 'fsr.s'
//     3) added 'wtWtScript' indicator
//  10/19/10  Added browser_id & sessionid check in dcsMultiTrackTop                            ms
//  07/26/10 do not reinit WT values                                                            ms
//  07/19/09 AFTER writing to SDC within dcsmultitrackTOP, clear out/reinitialize parms so      ms 
//           not to carryover persistent values to the bottom script from a previous call to dcsMultiTrackTOP.
//  03/15/08 Allow for bypassFlag to be passed in for times we may NOT want to run the bottom script  ms
//  02/29/08 dummy out WT.vt_sid so to override SDCv8.0. This rids the spaces that are added from multiple IPs ms
//  01/22/08 clear out/reinitialize parms so not to carryover persistent values when passing to dcsMultiTrackTOP. ms 	
//  12/2007 Re-allow WT.ti (ie page title) name/value pair to come thru to the SDC log. Space not an issue anymore.
//  09/2007 clone base tag and create this "top" version for events needing it before bottom tag loads  ms
//  05/2007 change from wls.cingular.com to wls.wireless.att.com to reflect new SDC domain      ms
//  05/25/2007 
//    1) allow for "bref" when building campaign id						                        ms
//    2) REenabled "q_returnUrl" for edatamart to use                                           ms
//  04/2007 
//    1) add the path to the session cookie                                                     ms
//    2) REenabled "browserid" for edatamart to use                                             ms
//  03/2007: 
//    1) stop toJSONString from writing to SDC logs (i.e. arrays WT[N] & DCS[N])  	        	ms
//       to conserve space.
//    2) added function dcsSetCookieTop().										  	            ms
//    3) added function chkForSourceTop().											  	        ms
//    4) commented "WT.sp" to keep from writing to SDC logs to conserve space.    		  	    ms
//  10/30/2006:		                                                                            mshmagin
//    1)For those parms being built in "dcsqry", check to see if we want to strip it from SDC log entry. 
//    2)Remove WT.ti (i.e. page title) name/value pair from the SDC log. It's taking up log space.
//    3)Created/added function "trackObject" to help track forms & gifs.                              
//  06/2006 added cookie/parm "inUser" for filtering out dev/tester work.                       mshmagin
//  02/2006 added dcsMultiTrack() function to support tracking event commands, gifs, pdfs etc.  mshmagin
//  04/2006 added dcsQPTop() function                                                              mshmagin
//  04/2006 rename ip for 'cingular.com' too 'www.cingular.com'                                 mshmagin


	var gImages=new Array;
	var gIndex=0;
	var DCS=new Object();
	var WT=new Object();
	var DCSext=new Object();
	var gQP=new Array();

	// ms 05/2007 change from wls.cingular.com to wls.wireless.att.com to reflect new SDC domain:
	var gDomain="wls.wireless.att.com";

	var gDcsId="dcsw1sx8x45vbwmw7v63tbf8m_1h2f";

	// M.S.: 04/2006 REenabled browserid for edatamart to use
	// M.S.: 10/2006 REMOVE the process that converts cookie "browserid" & avoid it being written the SDC log
	// ==================================== Convert these possible cookies to parms: ============================================
	dcs_cookieTop("browserid");

	// M.S.: 10/2006 REMOVE the process that converts cookie "DSESSIONID" & avoid it being written the SDC log
	//dcs_cookieTop("DSESSIONID");
	// ==================================================================================================================
	// M.S.: 06/2006 added cookie/parm process for filtering out 'dev' work. This cookie is set in the dev landing page & 
	//               will be converted to a parm here. We will filter out, in WT, based on this parm (ie intUser=Y). 
	// ==================================================================================================================
	dcs_cookieTop("intUser");

	if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1))
		{
		document.write("<SCR"+"IPT Language='JavaScript' SRC='"+"http://"+gDomain+"/"+gDcsId+"/wtid.js"+"'></SCR"+"IPT>");
		}


// ====================================================================================================
//Look for a cookie and, if found, create the SDC parm for it: 
function dcs_cookieTop(NAME){
	var cookies = document.cookie;
	var pos = cookies.indexOf(NAME + "=");
    if (pos != -1){
    	var start = pos + NAME.length + 1;
        var end = cookies.indexOf(";", start);
        if (end == -1) end = cookies.length;

		// MS 09/07/2011 make cookievalue global: 
        cookievalue = cookies.substring(start,end);
        cookievalue = unescape(cookievalue);    
 
		// MS 09/07/2011 only write parms if the session cookie "wt_aka_" is NOT set:
		// 				 add processing for cookie 'fsr.s':
		if (NAME != "wtAka" && NAME != "fsr.s") {
			DCSext[NAME] = cookievalue;
		}
		// MS 03/2007 added to return the cookievalue:
		return cookievalue;
	}
}


// ===============   end function dcs_cookieTop()  =========================================

// ====================================================================================================
// M.S.: 02/2006 added dcsMultiTrack() function to support tracking event commands, gifs, pdfs etc. 
// ====================================================================================================
function dcsMultiTrackTop(){

	// Note to developer: should you wish to NOT bypass the bottom script then call this with a name/value of:  'bypassFlag','N'
	
	//----------------------------------------------------------------------------------------
    // ms 01/22/08 clear out/reinitialize parms so not to carryover persistent values when passing to dcsMultiTrackTOP. 	

	// ms 01/22/08 initialize all PREVIOUS except for specific parms we want to keep from page to page:
 	for (N in DCSext){
		if (DCSext[N]) {
			if (N != "browserid" && N != "wtABTest") { 
				DCSext[N]="";
			}
		}
	}

	// ms 01/22/08 initialize the "pn_sku" & tx_u & "mc_id":
	for (N in WT){
		if (WT[N]) {
			if (N == "pn_sku" || N == "tx_u"  || "mc_id"){
				WT[N]="";
			} 
		}
	}


	// ms 03/15/08 Allow for bypassFlag to be passed in for times we may NOT want to run the bottom script
	bp = "Y";
	//---Load up arrays from the passed in parms to this multitrack call:
	for (var i=0;i<arguments.length;i++){
        	if (arguments[i].indexOf('WT.')==0){
               	WT[arguments[i].substring(3)]=arguments[i+1];
               	i++;
            	}
	        else if (arguments[i].indexOf('DCS.')==0){
			        DCS[arguments[i].substring(4)]=arguments[i+1];
        	       	i++;
            		}
    		     else if (arguments[i].indexOf('DCSext.')==0){
				        DCSext[arguments[i].substring(7)]=arguments[i+1];
		                i++;
        		    	}
						// ms 03/15/08 Allow for bypassFlag to be passed in for times we may NOT want to bottom script
            		  else if (arguments[i].indexOf('bypassFlag')==0){
			            	bp=arguments[i+1];
            			    i++;
		                    }
     } 

	 //MS 10/19/10  Added browser_id & sessionid check in dcsMultiTrackTop: 
	 dcs_cookieTop("browserid");
	 dcs_cookieTop("sessionid");
		 
     var dCurrent=new Date();
     DCS.dcsdat=dCurrent.getTime();
	 // ms 10/15/07  added to fetch dcssip:
	 DCS.dcssip=window.location.hostname;
	 // ms 09/07/11 add wtWtScript='Top' indicator:
	 DCSext.wtWtScript='Top';
 
     dcsTagTop();
	 
	//---------------------------------------------------------------------------------------------------------------
    //  07/19/09 ms AFTER writing to SDC within dcsmultitrackTOP, clear out/reinitialize parms so      
    //              not to carryover persistent values to the bottom script from a previous call to dcsMultiTrackTOP.
 	for (N in DCSext){
		if (DCSext[N]) {
			if (N != "browserid" && N != "wtABTest") { 
				DCSext[N]="";
			}
		}
	}

	// ms 07/26/10 do not reinit WT values:
	// ms 07/19/09 clear WT:
	/*
	for (N in WT){
		if (WT[N]) {
			WT[N]="";
		} 
	}
	*/
	//---------------------------------------------------------------------------------------------------------------
	 
	 	
	 // ms 03/15/08 Allow for bypassFlag to be passed in for times we may NOT want to bottom script
	 if (bp=="Y") {
		// ms 09/2007 set this global variable to bypass the same script running on bottom of page to avoid dupe hits.
	 	bypassFlag="Y";
	 }
}
// ===============   end function dcsMultiTrack() =========================================


// ========================================================================================
// M.S.: 04/042006 added dcsQPTop() function
// ========================================================================================
//
// Code section to convert parameters to WebTrends Parameter
//
function dcsQPTop(N){
	if (typeof(N)=="undefined"){
		return "";
	}
	var qry=location.search.substring(1);
	var pairs=qry.split("&");
	for (var i=0;i<pairs.length;i++){
		var pos=pairs[i].indexOf("=");
		if (pos==-1){
			continue;
		}
		if (pairs[i].substring(0,pos)==N){
			//MS 03/07 added first assignment equal sign:
			gQP[gQP.length] = ((i==0?"":"&")+pairs[i]);
			return pairs[i].substring(pos+1);
		}
	}
	return "";
}
// ===============   end function dcsQPTop() =========================================

function dcsVarTop(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();

	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=document.title;
	}
	WT.js="Yes";
	if (typeof(gVersion)!="undefined"){
		WT.jv=gVersion;
	}
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		if (document.body.connectionType){
			WT.ct=document.body.connectionType;
		}
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		if ((typeof(gFV)!="undefined")&&(gFV.length>0)){
			WT.fi="Yes";
			WT.fv=gFV;
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}

	// MS 03/07 commented "WT.sp" to keep from writing to SDC logs to conserve space:
	//WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;

	// See if any parms are on the URL:
	if (window.location.search){
		DCS.dcsqry=window.location.search;

		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}

    // 02/29/08 dummy out WT.vt_sid so to override SDCv8.0. This rids the spaces that are added from multiple IPs:  
	WT.vt_sid="123";

}

function ATop(N,V){
	//===============================================================================================================
	// mshmagin 10/30/2006 For those parms being built in "dcsqry", check to see if we want to strip it from SDC log entry:
	//   1) for call #1 to this function: "N" holds the name of the DCS variable (eg. "dcsqry"), "V" holds it's value:
	//   2) for call #2 to this function: "N" holds the name of the WT. variable (eg. "WT.ti"), "V" holds it's value:
	if (N=="dcsqry") 
		{
		var newdcsqry=stripParmsTop(V);
		V=newdcsqry;
		}
	//===============================================================================================================

	return "&"+N+"="+dcsEscapeTop(V);
}

function dcsEscapeTop(S){
	if (typeof(RE)!="undefined"){
		var retStr = new String(S);
		for (R in RE){
			retStr = retStr.replace(RE[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsLoadHrefTop(evt){
	if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
		window.location=gHref;
		gHref="";
	}
}

function dcsCreateImageTop(dcsSrc){
	//BEGIN ms  09/07/2011 add processing for cookie 'fsr.s':
	// Before the write to sdc check to see if any previously stored fsr.s (from Foresee Inc.) session cookie exists:
	var wtFsrSVal = dcs_cookieTop("fsr.s"); // check for the existence of the session cookie 
	var wtFsrSHold = "";
			
	if (typeof(wtFsrSVal) != "undefined") {
		//wtFsrSVal found so save off the cookie value temporarily:
		wtFsrSHold = wtFsrSVal;
		//now null out that cookie's value:
	    dcsSetCookieTop("fsr.s","","","","","/",".att.com","");
	}
	//END ms  09/07/2011 add processing for cookie 'fsr.s'
	
	// first see if browser version supports this object:
	if (document.images){
		gImages[gIndex]=new Image;
		if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
			gImages[gIndex].onload=gImages[gIndex].onerror=dcsLoadHref;
		}
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else {
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	
	}
	
	//BEGIN ms  09/07/2011 add processing for cookie 'fsr.s':
	// After the write to sdc put back any previously stored fsr.s (from Foresee Inc.) session cookie once again:
	if (wtFsrSHold != "") {	             
		// now PUT BACK that cookie's value:
		dcsSetCookieTop("fsr.s",wtFsrSHold,"","","","/",".att.com","");
	}				
	//END ms  09/07/2011 add processing for cookie 'fsr.s'
}

function dcsMetaTop(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		for (var i=1;i<=elems.length;i++){
			var meta=elems.item(i-1);
			if (meta.name){
				if (meta.name.indexOf('WT.')==0){
					WT[meta.name.substring(3)]=meta.content;
				}
				else if (meta.name.indexOf('DCSext.')==0){
					DCSext[meta.name.substring(7)]=meta.content;
				}
				else if (meta.name.indexOf('DCS.')==0){
					DCS[meta.name.substring(4)]=meta.content;
				}
			}
		}
	}
}

function dcsTagTop(){
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";

	for (N in DCS){
		if (DCS[N]) {
			// MS 03/2007 stop toJSONString from writing to SDC logs to conserve space:
			if (N != "toJSONString") { 
				P+=ATop(N,DCS[N]);
			}
		}
	}

	for (N in WT){
		if (WT[N]) {
			//==========================================================================================================
            //  12/2007 Re-allow WT.ti (ie page title) name/value pair to come thru to the SDC log. Space not an issue anymore.
			// MS       03/2007    stop toJSONString from writing to SDC logs to conserve space
			// mshmagin 10/30/2006 remove WT.ti (ie page title) name/value pair from the SDC log. It's taking up log space.
			if (N == "toJSONString"){
				continue;
			} 
			//==========================================================================================================
			
			P+=ATop("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			// MS 03/2007 stop toJSONString from writing to SDC logs to conserve space:
			if (N != "toJSONString") {  
				P+=ATop(N,DCSext[N]);
			}
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImageTop(P);
 
}

function dcsFuncTop(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

//=====================================================================================================================
//mshmagin 05/23/2007: reallow  "q_returnUrl" back into the logs, to be used by edatamart
//mshmagin 10/30/2006: 
//			Function "stripParms" will strip certain PARMS (they must exist as PARMS on the URL) from the URL before writing to SDC logs.
//          We do this so to help make the SDC logs smaller & thus reduce processing time for Webtrends.
//          The list of parms to strip is contained in a variable below. 
// mshmagin 10/30/2006 remove specific parms (eg _DARGS, q_returnUrl, etc.)  from the URL before writing to SDC server:                       
// mshmagin 10/30/2006 remove WT.ti (ie page title) name/value pair from the SDC log. It's taking up log space.
function stripParmsTop(v){

	//**********************************************************************************************************************
	// These are the list of any VISIBLE parms we wish to remove from Webtrends SDC logs. 
	// This is case sensitive. Also, try to separate them with a comma for readability purposes:
	var excludeTheseParmsValues="_DARGS,dsessionid,DSESSIONID,_requestid";
	//**********************************************************************************************************************
	//initialize:
	var newdcsqry = "";
	var newParmKnt = 0;

    // Get Entire Query String:
    var query = v;

    // Split entire query at each ampersand:
    var pairs = query.split("&"); 
                   
    // Begin loop through the query string:
    for (var i = 0; i < pairs.length; i++) {

	    var value = pairs[i];

 	    // Look for position of the "?" of the parm in the query string: 
        var startptr = pairs[i].indexOf('?');
		if (startptr == -1)  // "?" not found 
			{
			//reset position to beginning: 
			startptr=0;
			}
		else 
			{
			//reset position to just after the "?": 
			startptr=startptr+1;
			value =  pairs[i].substring(startptr);
			}
		
        // Look for postion of the "=" of the parm in the query string: 
        var endptr = pairs[i].indexOf('=');
		if (endptr == -1)  // "=" not found 
			{
			//reset position to beginning: FIX THIS IE  if not found
			endptr=0;
			}

		//get the argname & see if it's in the list above to strip out:
		var argname = pairs[i].substring(startptr,endptr); 
	    parms_Found_Or_Not_Indicator1 = excludeTheseParmsValues.indexOf(argname);
		if (parms_Found_Or_Not_Indicator1 == -1 ) {  // "-1" means requested stripped parm not found on URL so keep it:
	        // write it back with either a "?" or a "&":
			if (newParmKnt > 0)
				{ 
				// not first value, so stick ampersand in front:
				newdcsqry = newdcsqry+"&"+value;
				newParmKnt = newParmKnt + 1;
				}
			else
	 			{ 
			 	// first value so, stick question mark in front:
				newdcsqry = newdcsqry+"?"+value;
				newParmKnt = newParmKnt + 1;
				}
		} //endif
	} //endfor

	return newdcsqry;
} //end function

//===========================================================================================
// MS: 10/2006 Use function "trackObject" to help track forms & gifs. 
//			   A virtual link is passed & written to SDC so SmartView can map to it.
function trackObjectTop(objLink){
	var gDomain="wls.cingular.com";
	var gDcsId="dcsw1sx8x45vbwmw7v63tbf8m_1h2f";
	var dCurrent=new Date();
	var dcsdat=dCurrent.getTime();

	var dcssip=window.location.hostname;
	if (dcssip == 'cingular.com'){
	   dcssip = 'www.cingular.com';
	}

	var dcsref=window.location.href;
	var dcsuri="/"+objLink.pathname;
	var P="http://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?&dcsdat="+dcsdat+"&dcssip="+dcssip+"&dcsuri="+dcsuri+"&dcsref="+dcsref;

	//write to SDC log:
	dcsCreateImageTop(P);

} //end function
// ===============   end function trackObjectTop() =========================================

function dcsSetCookieTop ( name, value, exp_y, exp_m, exp_d, path, domain, secure ){
  var cookie_string = name + "=" + escape ( value );
  if ( exp_y ) {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }
  if ( path ) {
        cookie_string += "; path=" + escape ( path );
  }
  if ( domain ) {
        cookie_string += "; domain=" + escape ( domain );
  }
  if ( secure ) {
        cookie_string += "; secure";
  }

  document.cookie = cookie_string;
}
// ===============   end function dcsSetCookieTop() =========================================

/**************************************************************************************************************************/ 
/* MS 03/2007 Interrogate URL for the parm "source" & "bref", return value back & assign it as the campaign, pass it across all pages, and finally, assign it to a WT campaign. */
function chkForSourceTop() {
	var src  = dcsQPTop("source");
	var bref = dcsQPTop("bref");
	if (src == "" && bref == "") 
		{
		// there is NO "source" or "bref" parm on the URL:
		} 
	else
		{
		 // there is a "source" or "bref" parm on the URL:
		 if (src.substr(0,1) == "E" || src.substr(0,1) == "I" || bref.substr(0,1) == "E" || bref.substr(0,1) == "I") // NOTE: only "E"xternal or "I"nternal campaign codes
  			{
			if (src !="")
				{
	  			WT.mc_id = src;
				}
			else
				{
  				WT.mc_id = bref;
				}

 			} // end if
		} // end else
} // end function
// ===============   end function chkForSourceTop() =========================================

// -- END WebTrends --