var outage_states = new Array();






function outageCheck(stateName)
{
	var arr_length = outage_states.length;
	for( var iCount = 0; iCount < arr_length; iCount++){
		if(outage_states[iCount] == stateName){
			return 1;
		}
	}
	return 0;
}

function getCookie(NameOfCookie)
{
	if (document.cookie.length > 0){
		begin = document.cookie.indexOf(NameOfCookie+"=");
		if (begin != -1){
			begin += NameOfCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			if (end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end));
		}
	}
	return null;
}

function versionCheck()
{
	var agt=navigator.userAgent.toLowerCase();
	var is_major = parseInt(navigator.appVersion);
	var is_ie     = (agt.indexOf("msie") != -1);
	var is_ie3    = (is_ie && (is_major < 4));
	var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
	var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
	return is_ie5up;
}




