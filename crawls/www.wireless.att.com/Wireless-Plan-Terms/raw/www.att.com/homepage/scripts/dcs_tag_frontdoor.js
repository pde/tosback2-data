// -- START WebTrends --

//  DATE     MODIFICATION                                                                       Author
//======================================================================================================
//  11/12/2008: 
//     1) added fetch for the zip in "attPersistantLocalization"                                    ms
//     2) added dcsParseCookie() functionality                                                      ms
//     3) added dcsChkIP() to convert the IP check to a case statement                              ms
//     4) restructured to place functions at top of script                                          ms
//  09/25/2008 Per F.H., check for existence of DCSext since it could be already defined in csct.js ms/fh
//  08/21/2008: 
//    1) Hitbox process (i.e. hbx.pn )                                                             ms
//    2) rename ip for 'att.com' too 'www.att.com'                                                 ms 
//  07/30/2008:
//    1) support for bmediasource cookie                                                            ms
//    2) new WireLINE special title code                                                            ms
//  07/14/2008 set this global variable to bypass the same script running on bottom of page to avoid dupe hits initiated from the VS script. ms
//  02/29/08 dummy out WT.vt_sid so to override SDCv8.0 to rid the spaces that are added from multiple IPs  ms
//  12/2007 Re-allow WT.ti (ie page title) name/value pair to come thru to the SDC log. Space not an issue anymore. ms
//  10/05/2007 support for "source" to feed edm                                                     ms 
//  09/12/2007 support for same named meta tags (collect and concatenate them)                      ms 
//  08/29/2007 chk for bypass flag existence that could be passed from a special cloned 'top' script  ms
//  05/2007 change from wls.cingular.com to wls.wireless.att.com to reflect new SDC domain          ms
//  05/25/2007: 
//    1) allow for "bref" when building campaign id						                            ms
//    2) REenabled "q_returnUrl" for edatamart to use                                               ms
//  04/2007 
//    1) add the path to the session cookie                                                         ms
//    2) REenabled "browserid" for edatamart to use                                                 ms
//  03/2007: 
//    1) stop toJSONString from writing to SDC logs (i.e. arrays WT[N] & DCS[N])  	        	    ms
//       to conserve space.
//    2) added function dcsSetCookie().											  	                ms
//    3) added function dcsChkForSource().											  	            ms
//    4) commented "WT.sp" to keep from writing to SDC logs to conserve space.    		  	        ms
//  10/30/2006:		                                                                                ms
//    1)For those parms being built in "dcsqry", check to see if we want to strip it from SDC log entry. 
//    2)Remove WT.ti (i.e. page title) name/value pair from the SDC log. It's taking up log space.
//    3)Created/added function "dcsTrackObject" to help track forms & gifs.                              
//  06/2006 added cookie/parm "inUser" for filtering out dev/tester work.                       ms
//  02/2006 added dcsMultiTrack() function to support tracking event commands, gifs, pdfs etc.  ms
//  04/2006 added dcsQP() function                                                              ms
//  04/2006 rename ip for 'cingular.com' too 'www.cingular.com'                                 ms


//alert("in dcstagHP");
//===============================================================================================
//                                           functions
//===============================================================================================
// ====================================================================================================
// M.S.: 11/12/2008 added dcsParseCookie() functionality
//  Looks for a named variable in a named cookie and returns it's value: 
// ====================================================================================================
function dcsParseCookie(NAME,VALUE){
	if (cookievalue.indexOf(VALUE+"=") != -1) {			    
		beginCookieNamePOS=cookievalue.indexOf(VALUE+"=");    
		endCookieNamePOS=beginCookieNamePOS+3;
		// MS: 11/12/2008 look for the ending of the value:
		if (pipePOS=cookievalue.indexOf("|",beginCookieNamePOS) != -1) {
			pipePOS=cookievalue.indexOf("|",beginCookieNamePOS);
			zipCookieValue=cookievalue.substring(endCookieNamePOS+1,pipePOS);
			}
		else {
			 zipCookieValue=cookievalue.substring(endCookieNamePOS+1);
			 }
							
		cookievalue=zipCookieValue;
		return cookievalue;
	}
} //end function 
// ===============   end function dcsParseCookie =========================================

// ==================================== Convert these possible cookies to parms: ============================================
// MS: Look for a cookie and, if found, create the SDC parm for it: 
function dcs_cookie(NAME){
	var cookies = document.cookie;
    var pos = cookies.indexOf(NAME + "=");
    if (pos != -1){
    	var start = pos + NAME.length + 1;
        var end = cookies.indexOf(";", start);
                
		if (end == -1) end = cookies.length;
				
		// MS 11/12/2008 make cookievalue global: 
		cookievalue = cookies.substring(start,end);
		//var cookievalue = cookies.substring(start,end);
        
		cookievalue = unescape(cookievalue); 

		// BEGIN M.S.: 11/12/2008 added dcsParseCookie() functionality
		if (NAME=="attPersistantLocalization") {
			VALUE="zip";  //define the value being looked for
			var returnedValue = dcsParseCookie(NAME,VALUE);  // in a named cookie get the value assigned to the named variable
			if (typeof(returnedValue) != "undefined") {
				cookievalue=returnedValue; // rewrite the value assigned to the cookie
				wtName="wtZipCode";
				NAME=wtName;   //recreate the name of the parm to create
	       	    DCSext[NAME] = cookievalue;
			}
		}
		else
			// END M.S.: 11/12/2008 added dcsParseCookie() functionality
			{
    	     DCSext[NAME] = cookievalue;
			}					
			// MS 03/2007 added to return the cookievalue:
		return cookievalue;
	}
}
// ===============   end function dcs_cookie  =========================================

//
// Code section to convert parameters to WebTrends Parameter
//
function dcsQP(N){
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
// ===============   end function dcsQP() =========================================

		function dcsVar(){
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
							// 10/05/2007 support for source to feed edm  
							var end=DCS.dcsqry.substring(pos,DCS.dcsqry.length);
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

		} //end function dcsVar



function dcsLoadHref(evt){
	if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
		window.location=gHref;
		gHref="";
	}
}


function dcsMeta(){
	var elems;
	if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	else if (document.all){
		elems=document.all.tags("meta");
	}
		 
	if (typeof(elems)!="undefined"){
		/* begin ms 09/12/2007 support for same named meta tags: */
		var k = 0; // index used in adding to the arrays "holdMetaNames" and "holdMetaContent"
		/* end ms 09/12/2007 support for same named meta tags: */
		for (var i=1;i<=elems.length;i++){
			var meta=elems.item(i-1);
			if (meta.name)
			{
				if (meta.name.indexOf('WT.')==0){
					WT[meta.name.substring(3)]=meta.content;
					}
				else if (meta.name.indexOf('DCSext.')==0) {
					/* begin ms 09/12/2007 support for same named meta tags: */

					// check to see if this meta name is in the hold table:
					var inTableYN="";
				
					for (var m=0;m < holdMetaNames.length;m++){
						if (holdMetaNames[m]== meta.name){
							holdMetaContent[m]= holdMetaContent[m]+"|"+meta.content;
							inTableYN="Y";
							break;
						}
			    	}

					if (inTableYN == "Y") { 
						// do nothing, already appended above
						}
					else {
						// not in table yet so add it:
						holdMetaNames[k]=meta.name;
						holdMetaContent[k]=meta.content;
						k++;
					}
								
					/* end ms 09/12/2007 support for same named meta tags: */
					// ms original code commented out:
					//DCSext[meta.name.substring(7)]=meta.content;
				}
				else if (meta.name.indexOf('DCS.')==0){
					DCS[meta.name.substring(4)]=meta.content;
				}
			} //end if
		} //end for
		/* begin ms 09/12/2007 support for same named meta tags: */
		// ms build all the "DCSext" meta tags:
		for (var j=0;j<holdMetaNames.length;j++){
			DCSext[holdMetaNames[j].substring(7)]=holdMetaContent[j];
		}
				
		/* end ms 09/12/2007 support for same named meta tags: */
	}
}


function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

//=====================================================================================================================
//ms 05/23/2007: reallow  "q_returnUrl" back into the logs, to be used by edatamart
//ms 10/30/2006: 
//			Function "dcsStripParms" will strip certain PARMS (they must exist as PARMS on the URL) from the URL before writing to SDC logs.
//          We do this so to help make the SDC logs smaller & thus reduce processing time for Webtrends.
//          The list of parms to strip is contained in a variable below. 
// ms 10/30/2006 remove specific parms (eg _DARGS, q_returnUrl, etc.)  from the URL before writing to SDC server:                       
// ms 10/30/2006 remove WT.ti (ie page title) name/value pair from the SDC log. It's taking up log space.

//===========================================================================================
// MS: 10/2006 Use function "dcsTrackObject" to help track forms & gifs. 
//			   A virtual link is passed & written to SDC so SmartView can map to it.
function dcsTrackObject(objLink){
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
	dcsCreateImage(P);
} //end function
// ===============   end function dcsTrackObject() =========================================

function dcsSetCookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure ){
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
// ===============   end function dcsSetCookie() =========================================

/**************************************************************************************************************************/ 
/* MS 03/2007 Interrogate URL for the parm "source" & "bref", return value back & assign it as the campaign, pass it across all pages, and finally, assign it to a WT campaign. */
function dcsChkForSource() {
	var src  = dcsQP("source");
	var bref = dcsQP("bref");
	if (src == "" && bref == "") 
		{
		// there is NO "source" or "bref" parm on the URL:
		var saFlowType1Val = dcs_cookie("saFlowType1"); // check for the existence of the first cookie 
		if (saFlowType1Val == null) 
			{
				// do nothing (saFlowType1 NOT found)
			} 
		else
			{
				// saFlowType1 found, write the parm for it to SDC for the present page:
    			document.write('<META NAME="DCSext.saFlowType1" CONTENT="'+saFlowType1Val+'">');
    
				var saFlowType2Val = dcs_cookie("saFlowType2"); // check for the existence of the second cookie
				if (saFlowType2Val == null) 
					{
					// do nothing (saFlowType2 NOT found)
					}
				else
					{
					// saFlowType2 found, write the parm for it to SDC for the present page:
	    			document.write('<META NAME="DCSext.saFlowType2" CONTENT="'+saFlowType2Val+'">');
					} 
			}
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

			var cv = WT.mc_id; //set campaign val variable
			//==================================================================
			// now check to see if this was the second most recent campaign:
			var saFlowType1Val = dcs_cookie("saFlowType1"); // get the cookie
			if (saFlowType1Val == null) 
				{
				// No previous saFlowType1 found, it's the first campaign:
				dcsSetCookie("saFlowType1",cv,"","","","/","","");
				document.write('<META NAME="DCSext.saFlowType1" CONTENT="'+cv+'">');
				}
			else
				{
				// previous saFlowType1 found, flip-flop them & write them both out to SDC:
				// make the "most recent campaign value" to be the first campaign:
				dcsSetCookie("saFlowType1",cv,"","","","/","","");
				document.write('<META NAME="DCSext.saFlowType1" CONTENT="'+cv+'">');

				// make the previous campaign to be the second campaign:
				dcsSetCookie("saFlowType2",saFlowType1Val,"","","","/","","");
	    		document.write('<META NAME="DCSext.saFlowType2" CONTENT="'+saFlowType1Val+'">');
				}
			  //==================================================================
		 } // end if
	} // end else
} // end function
// ===============   end function dcsChkForSource() =========================================
function dcsMultiTrack(){
			for (var i=0;i<arguments.length;i++){
        		if (arguments[i].indexOf('WT.')==0){
            	   	WT[arguments[i].substring(3)]=arguments[i+1];
               		i++;
            	}

	            if (arguments[i].indexOf('DCS.')==0){
    	       		DCS[arguments[i].substring(4)]=arguments[i+1];
        	       	i++;
            	}

            	if (arguments[i].indexOf('DCSext.')==0){
            		DCSext[arguments[i].substring(7)]=arguments[i+1];
	                i++;
            	}
    	    } 

        	var dCurrent=new Date();
	        DCS.dcsdat=dCurrent.getTime();
    	    dcsTag();
}
// ===============   end function dcsMultiTrack() =========================================
function dcsA(N,V){
	//===============================================================================================================
	// ms 10/30/2006 For those parms being built in "dcsqry", check to see if we want to strip it from SDC log entry:
	//   1) for call #1 to this function: "N" holds the name of the DCS variable (eg. "dcsqry"), "V" holds it's value:
	//   2) for call #2 to this function: "N" holds the name of the WT. variable (eg. "WT.ti"), "V" holds it's value:
	if (N=="dcsqry") 
		{
		var newdcsqry=dcsStripParms(V);
		V=newdcsqry;
		}
	//===============================================================================================================
	return "&"+N+"="+dcsEscape(V);
}
function dcsStripParms(v){

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
} //end function dcsStripParms

function dcsTag(){
			var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
			for (N in DCS){
				if (DCS[N]) {
					// MS 03/2007 stop toJSONString from writing to SDC logs to conserve space:
					if (N != "toJSONString") { 
						P+=dcsA(N,DCS[N]);
					}
				}
			}

			for (N in WT){
				if (WT[N]) {
					//==========================================================================================================
					// MS 07/30/2008 new WireLINE special title code, look for the WireLINE special title statement (i.e. _pn) and override the html title with it.
					if (N == "ti"){

						// MS 08/21/2008 Hitbox process (i.e. hbx.pn ):				
						if (typeof(hbx) != "undefined")
						   {
							   for (M in hbx) { // hbx is a possible object defined in the WireLINE hbx.js script which holds their special title statement
								   if ([M=="pn"]) {
									  DCSext.wtPN = hbx.pn;  // add another parm with the special value defined by WireLINE
							       }
						       } //end for
						   }
						   
						// MS 07/30/2008 '13 State'/VS process (i.e. v ):				
						if (typeof(v) != "undefined")
							{
								for (M in v) { // v is a possible array defined in another WireLINE script which holds their special title statement
									if ([M=="_pn"]) {
										//WT.ti = v[M];  // override the normal title value with the WireLINE defined value
										DCSext.wtPN = v["_pn"];  // add another parm with the special value defined by WireLINE
									}
								} //end for
							}
					}
					//==========================================================================================================

					//==========================================================================================================
					// MS       12/2007 Re-allow WT.ti (ie page title) name/value pair to come thru to the SDC log. Space not an issue anymore.
					// MS       03/2007    stop toJSONString from writing to SDC logs to conserve space
					// ms 10/30/2006 remove WT.ti (ie page title) name/value pair from the SDC log. It's taking up log space.
					if (N == "toJSONString"){
						continue;
					} 
					//==========================================================================================================
			
					P+=dcsA("WT."+N,WT[N]);
				}
			}
			for (N in DCSext){
				if (DCSext[N]) {
					// MS 03/2007 stop toJSONString from writing to SDC logs to conserve space:
					if (N != "toJSONString") {  
						P+=dcsA(N,DCSext[N]);
					}
				}
			}
			if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
				P=P.substring(0,2040)+"&WT.tu=1";
			}
			dcsCreateImage(P);
} //end function dcsTag
function dcsEscape(S){
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
} //end function dcsEscape
function dcsCreateImage(dcsSrc){
			var wtImTag = '<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">';
			 $('wTMetaImg').update(wtImTag);
} //end function dcsCreateImage

//  11/12/2008 added dcsChkIP() to convert the test to a case statement:
function dcsChkIP() {
	switch (DCS.dcssip) {
		case 'cingular.com':
			DCS.dcssip = 'www.cingular.com';
			break;
		case 'wireless.att.com':
			DCS.dcssip = 'www.wireless.att.com';
			break;
		case 'att.com':
			DCS.dcssip = 'www.att.com';
			break;
	}
} // end function dcsChkIP
// ===============   end function dcsChkIP =========================================


//INITIALIZE GLOBAL VARS:
var DCS=new Object();
var WT=new Object();
// M.S.: 09/25/2008 Per F.H., check for pre-existence of "DCSext" since it could be already defined in csct.js:
if (typeof(DCSext)=="undefined") { 
	var DCSext=new Object(); 
}
// ms 05/2007 change from wls.cingular.com to wls.wireless.att.com to reflect new SDC domain:
var gDomain="wls.wireless.att.com";
var gImages=new Array;
var gIndex=0;
var gQP=new Array();
var gDcsId="dcsw1sx8x45vbwmw7v63tbf8m_1h2f";
/* begin ms 09/12/2007 support for same named meta tags: */
var holdMetaNames=new Array();
var holdMetaContent=new Array();
/* end   ms 09/12/2007 support for same named meta tags: */

//============================================================================================================
function dcsMain() {
	
		// M.S.: 04/2006 REenabled browserid for edatamart to use
		// M.S.: 10/2006 REMOVE the process that converts cookie "browserid" & avoid it being written the SDC log
		dcs_cookie("browserid");

		// M.S.: 10/2006 REMOVE the process that converts cookie "DSESSIONID" & avoid it being written the SDC log
		//dcs_cookie("DSESSIONID");
		// ==================================================================================================================
		// M.S.: 06/2006 added cookie/parm process for filtering out 'dev' work. This cookie is set in the dev landing page & 
		//               will be converted to a parm here. We will filter out, in WT, based on this parm (ie intUser=Y). 
		// ==================================================================================================================
		dcs_cookie("intUser");
		//MS:  07/30/2008 support for bmediasource cookie:
		dcs_cookie("bmediasource");
		// BEGIN M.S.: 11/12/2008 added fetch for the zip in "attPersistantLocalization":
		dcs_cookie("attPersistantLocalization");

		if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)) 
			{
			document.write("<SCR"+"IPT Language='JavaScript' SRC='"+"http://"+gDomain+"/"+gDcsId+"/wtid.js"+"'></SCR"+"IPT>");
			}

		//MS 03/2007  Check for "source=" parm:
		dcsChkForSource();

		dcsVar();
		dcsMeta();
		dcsFunc("dcsAdv");

		//MS 11/12/2008 added dcsChkIP() to convert the test to a case statement:
		dcsChkIP();

		dcsTag();

		//ms 07/14/2008 set this global variable to bypass the same script running on bottom of page to avoid dupe hits initiated from the VS script. 
	 	bypassFlag="Y";

} //end dcsMain() 

// -- END WebTrends --
