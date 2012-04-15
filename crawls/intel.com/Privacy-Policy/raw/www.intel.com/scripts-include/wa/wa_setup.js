// wa_setup.js Version 5.0
//  History */
// Version 4.0 - Dec 2008 - Added shopping cart vars, updated to H Code
// -------------------------------------
// Version 4.1 - Feb 2009 - Corrected DFA code, added wa_trackDFA to disable DFA code, added wa_hier2
// -------------------------------------
// Version 4.2 - May 2009 - No change required to this file for release
// -------------------------------------
// Version 4.3 - Aug 2009 - Added wa_trackCorp variable
// -------------------------------------
// Version 4.4 - Dec 2009 - No change
// -------------------------------------
// Version 4.5 - May 2010 - Added wa_keyword
// -------------------------------------
// Version 5.0 - Jan 2011 - Added 25 eVars, props
// -------------------------------------


var wa_queryObj = waParseQueryString(location.search);

var wa_pageName = wa_org1 = wa_org2 = wa_org3 = wa_org4 = wa_orgX = wa_geo = wa_language = wa_iid = wa_reportSuites = wa_url = wa_ngipDocId = wa_ngipUniqueId = wa_campaign = wa_crtvid = wa_events = 
wa_prop14 = wa_prop15 = wa_prop17 = wa_prop18 = wa_keyword = wa_prop20 =
wa_custom01 = wa_custom02 = wa_custom03 = wa_custom04 = wa_custom05 = wa_custom06 = wa_custom07 =wa_custom08 = wa_custom09 = wa_custom10 =   	wa_custom11 = wa_custom12 = wa_custom13 = wa_custom14 = wa_custom15 = 
wa_custom36 = wa_custom37 = wa_custom38 = wa_custom39 = wa_custom40 = wa_custom41 = wa_custom42 =wa_custom43 = wa_custom44 = wa_custom45 = 		wa_custom46 = wa_custom47 = wa_custom48 = wa_custom49 = wa_custom50 = wa_custom51 = wa_action = wa_dnld = wa_custom54 = wa_custom55 =wa_custom56 = wa_custom57 = wa_custom58 = wa_custom59 = wa_custom60 = wa_custom61 = wa_custom62 =wa_custom63 = wa_custom64 = wa_custom65 = wa_custom66 = wa_custom67 = wa_custom68 = wa_custom69 = wa_custom70 = wa_custom71 = wa_custom72 = wa_custom73 = wa_custom74 = wa_custom75 =
wa_eCustom06 = wa_eCustom07 = wa_eCustom08 = wa_eCustom09 = wa_eCustom10 = wa_eCustom11 = wa_eCustom12 = wa_eCustom13 = wa_eCustom14 =
wa_eCustom15 = wa_eCustom16 = wa_eCustom17 = wa_eCustom18 = wa_eCustom19 = wa_eCustom20 = wa_eCustom21 = wa_eCustom22 = wa_eCustom23 = 
wa_eCustom24 = wa_eCustom25 = wa_eCustom26 = wa_eCustom27 = wa_eCustom28 = wa_eCustom29 = wa_eCustom30 = wa_eCustom31 = wa_eCustom32 = 
wa_eCustom33 = wa_eCustom34 = wa_eCustom35 = wa_eCustom36 = wa_eCustom37 = wa_eCustom38 = wa_eCustom39 = wa_eCustom40 = wa_eCustom41 =
wa_eCustom42 = wa_eCustom43 = wa_eCustom44 = wa_eCustom45 = wa_eCustom46 = wa_eCustom47 = wa_eCustom48 = wa_eCustom49 = wa_eCustom50 = 
wa_eCustom51 = wa_eAction = wa_eDnld = wa_eCustom54 = wa_eCustom55 = wa_eCustom56 = wa_eCustom57 = wa_eCustom58 = wa_eCustom59 = 
wa_eCustom60 = wa_eCustom61 = wa_eCustom62 = wa_eCustom63 = wa_eCustom64 = wa_eCustom65 = wa_eCustom66 = wa_eCustom67 = wa_eCustom68 = 
wa_eCustom69 = wa_eCustom70 = wa_eCustom71 = wa_eCustom72 = wa_eCustom73 = wa_eCustom74 = wa_eCustom75 = 
wa_visitId = wa_referrer = wa_profileID = wa_products = wa_purchaseID = wa_pageType = wa_intFilters = wa_urlQueryString = wa_trackDownloads = wa_trackCorp = wa_trackDFA = "";

var wa_visitId = waGetCookie('wa_visitId');
if (wa_visitId == null)
{
	wa_visitId = waNewId();
}


waSetCookie('wa_visitId', wa_visitId);

function waParseQueryString(queryString)
{
	var queryObject = new Object();
	queryString = queryString.replace(/^.*\?(.+)$/,'$1');

	while ((pair = queryString.match(/([^=]+)=\'?([^\&\']*)\'?\&?/)) && pair[0].length)
	{
		queryString = queryString.substring( pair[0].length );
		//if (/^\-?\d+$/.test(pair[2])) pair[2] = parseInt(pair[2]);
		queryObject[pair[1]] = pair[2];
	}

	return queryObject;
}

function waNewId()
{
	var guid = "{";
	for (var i = 1; i <= 32; i++)
	{
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	guid += "}";
	return guid;
}

function waGetCookie (name)
{
	var arg = name + "=";
	var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen)
    {
		var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
			return waGetCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
			break;
	}
	return null;

}

function waGetCookieVal (offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function waSetCookie (name, value)
{
	var wa_cookieExpDate = new Date ();	
	wa_cookieExpDate.setTime(wa_cookieExpDate.getTime() + (365 * 24 * 3600 * 1000));
    document.cookie = name + "=" + escape (value) +
		"; expires=" + wa_cookieExpDate.toGMTString() +
		"; path=/" +
        "; domain=.intel.com"
       
}

function checkMeta(tagNameIn) {
	
  var metas = document.getElementsByTagName('META');
  var i;
  for (i = 0; i < metas.length; i++)
    if (metas[i].getAttribute('name') == tagNameIn)
		var tagNameValue = metas[i].getAttribute('content');		
		return tagNameValue;
		 
}

var script1 = '<sc'+'ript language="JavaScript" src="', script2 = '"></sc'+'ript\>'
if (location.protocol.indexOf("https:") > -1) {
	document.write(script1+'https://www-ssl.intel.com/sites/wap/dfa/dfaConfig.js'+script2);
}
else {
	document.write(script1+'http://www.intel.com/sites/wap/dfa/dfaConfig.js'+script2);
}


