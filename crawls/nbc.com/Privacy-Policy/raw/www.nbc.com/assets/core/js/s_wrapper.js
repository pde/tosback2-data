s_linkInternalFilters="javascript:,nbcvoicelive.com,latenightwithjimmyfallon.com,nbc.com,9thwonders.com,startomorrow.com,studio60theseries.com,fridaynightlightstheseries.com,itsyourshowtv.com,jaylenosgarage.com,my.nbc.com";

var s_account="nbcuglobal,nbcunetworkbu"; 
var s_prop8 ="TV Entertainment";
var s_prop9 ="NBC Network";
var __domain = document.domain;

if (__domain.substring(0, 3) == "dev" || __domain.substring(0, 5) == "stage") {
	s_account = "nbcudev2";
} else {
	_qacct="p-9eJ8k4iSzux46";
}

if (typeof(flashVersion) == 'undefined') { flashVersion='Undefined'; }

var s_prop40=flashVersion;

try {
	var s_channel = nbcu.util.common.getDevice();
} catch(err) {}

try {
	env = nbcu.config.getParam("nbcuEnvironment");
	cookieName = (env == "production") ? "sn_nbc_b" : env + "_sn_nbc_b";
	if (cookie = jqN.cookie(cookieName)) {
		parts = cookie.split("|");
		s_prop33 = s_eVar33 = parts[5];
		s_prop34 = s_eVar34 = parts[2];
		s_prop35 = s_eVar35 = parts[4];
		s_prop1 = s_eVar1 = 'SNAS registered';
	}
	
	cookieName = (env == "production") ? "external_platform" : env + "_external_platform";
	if (cookie = jqN.cookie(cookieName)) {
		parts = cookie.split("|");
		if (parts[0] != '') {
			s_prop1 = s_eVar1 = parts[0].substr(0,1).toUpperCase()+parts[0].substr(1).toLowerCase() + ' registered';
		}
	}	
} catch(err) {}

document.write('<s'+'cript src="/assets/core/js/s_code.js"></s'+'cript>');

if (window.location.protocol == 'https:') {
	document.write('<s'+'cript src="https://www.nbcudigitaladops.com/hosted/global_header.js"></s'+'cript>');		
} else {
	document.write('<s'+'cript src="http://www.nbcudigitaladops.com/hosted/global_header.js"></s'+'cript>');		
}
