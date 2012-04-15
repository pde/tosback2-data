// Store campaign id (cid URL param value) in campaign_id cookie (to be detected by BYL, etc and sent to Cobalt)
function setCampaignId() {
	// Expiration to year from now
	var CAMAPAIGN_EXPIRATION = new Date();
	CAMAPAIGN_EXPIRATION.setTime(CAMAPAIGN_EXPIRATION.getTime() + 1000 * 60 * 60 * 24 * 30);

	if (!qsVars) {
		// This loads all variables in a querystring into an associative array named qsVars
		// I.e., qsVars[variable_name] == variable_value when querystring is ?variable_name=variable_value&...
		var qsVars = new Array();
		var queryString = location.search;
		if (queryString != "") {
			// -- get rid of ? at start --
			var qsdata = queryString.slice(1,queryString.length);
			var qsvalues = qsdata.split("&");
			for (i=0; i < qsvalues.length; i++) {
				var qsvaluepair = qsvalues[i].split("=");
				qsVars[qsvaluepair[0]] = qsvaluepair[1];
			}
		}
	}

	// Parameter value is assigned to temp var value
	var cid_str = qsVars['cid'];
	var srchid_str = qsVars['srchid'];
	var siteid_str = qsVars['siteid'];
	var s_ocid_str = qsVars['s_ocid'];
	// If cid exists, store it in cid_str cookie
	if (cid_str && cid_str!="") {
		document.cookie="cid="+cid_str+"; expires="+CAMAPAIGN_EXPIRATION.toGMTString()+"; path=/";
	    }	

	// If srchid exists, store it in srchid_str cookie
	if (srchid_str && srchid_str!="") {
		document.cookie="srchid="+srchid_str+"; expires="+CAMAPAIGN_EXPIRATION.toGMTString()+"; path=/";
	    }

	// If siteid exists, store it in siteid_str cookie			
	if (siteid_str && siteid_str!="") {
		document.cookie="siteid="+siteid_str+"; expires="+CAMAPAIGN_EXPIRATION.toGMTString()+"; path=/";
	    }	

	// If s_ocid exists, store it in s_ocid_str cookie
	if (s_ocid_str && s_ocid_str!="") {
		document.cookie="s_ocid="+s_ocid_str+"; expires="+CAMAPAIGN_EXPIRATION.toGMTString()+"; path=/";
	    }	
			
}

function getCampaignId() {
	var temp_url_string = "";

	function GetCookie(a){var e,m=" "+document.cookie+";",N=" "+a+"=",s=m.indexOf(N),r="";if(s!=-1){s+=N.length;e=m.indexOf(";",s);r=unescape(m.substring(s,e))}return r}

//get value of cookies and assign value to temp string
	var cid_str = GetCookie('cid');
	var srchid_str = GetCookie('srchid');
	var siteid_str = GetCookie('siteid');
	var s_ocid_str = GetCookie('s_ocid'); 
//If value of temp string not null (exists) append value to URL
	if (cid_str && cid_str!="") {
		temp_url_string += "&cid=" + cid_str;
	    }	

	if (srchid_str && srchid_str!="") {
		temp_url_string += "&srchid=" + srchid_str;
	    }
		
	if (siteid_str && siteid_str!="") {
		temp_url_string += "&siteid=" + siteid_str;
	    }	

	if (s_ocid_str && s_ocid_str!="") {
		temp_url_string += "&s_ocid=" + s_ocid_str;
	    }
		
	return temp_url_string;
}
 
