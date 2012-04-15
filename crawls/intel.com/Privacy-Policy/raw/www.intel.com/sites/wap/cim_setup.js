// cim_setup.js
//
//      Author:  Aaron Fischer (aaron.a.fischer@intel.com)
//     Created:  2004.10.08
// Description:  Expands the wa_setup.js API with additional methods for programmatically 
//               accessing a web page's metadata.

if (location.pathname.indexOf(".")>-1) {
	var pathObj = ParseURLPathName( location.pathname.toLowerCase());
}
else {
	var pathObj = ParseURLPathName( location.pathname.toLowerCase() +"/" );
}

// ParseURLPath()
//        input:  string - the URL path name of the web page in question
//       output:  object - pathObject { dir[], fullDir, fileName }
//  description:  parses the URL path into its component directories and file name.
//                e.g. "/a/b/foo.htm" becomes pathObject.dir[0] = "a", 
//			      pathObject.dir[1] = "b", pathObject.fullDir = "/a/b/", 
//				  pathObject.fileName = "foo.htm"
//
function ParseURLPathName(strURL)
{		
	var pathObject = new Object();
	pathObject.dir = new Array();

	// Assumed input string format:  
	// <URL_path><file_name> i.e. <dir1><dir2>...<dirN><file_name>
	//
	// /^             // match at beginning of string
	//   (.+?)        // non-greedily match and capture all.  Targets <dir1>
	//   (?:\/)+      // match zero or more "/" without capture
	//   (.*)         // greedily match all.  Targets <dir2>...<dirN><file_name>
	// /
	//
	// Note:  This is a much more complicated approach than strURL.split("/"),
	// but I thought it necessary for the rare case when multiple forward-slashes
	// are included in the URL path, e.g. a/b//c/d//foo.htm
	//
	i = 0;
	pathObject.fullDir = "/";
	strURL = strURL.replace(/^\//,"");  // Remove any beginning / in our URL
	while ((node = strURL.match(/^(.+?)(?:\/)+(.*)/)) && node[0].length)
	{
		pathObject.dir[i++] = node[1]; 					
		pathObject.fullDir += node[1] + "/";
		strURL = node[2];
	}
	pathObject.fileName = strURL;
	return pathObject;
}
function sendAnalyticsEvent(accnt){	
accnt=accnt?accnt:wa_reportSuites;void(s_gs(accnt))
}
function sendLinkEvent(accnt,lnkname,type){	
accnt=accnt?accnt:wa_reportSuites;s_linkType=type?type:"o";s_lnk=true;
s_linkName=lnkname?lnkname:s_linkName?s_linkName:"Flash Link Event";
void(s_gs(accnt));
}
function get_campaign_var(){	
cv1=(typeof wa_queryObj.ppc_cid == "undefined") ? "" : wa_queryObj.ppc_cid;
cv2=(typeof wa_queryObj.cid == "undefined") ? "" : wa_queryObj.cid;
if (cv1){return cv1}else if (cv2){return cv2}else{return ""};
}
