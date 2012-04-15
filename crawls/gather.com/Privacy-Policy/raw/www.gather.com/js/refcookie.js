function getCookie (name) 
{
    var prefix = name + '=';
    var c = document.cookie;
    var nullstring = '';
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1) return nullstring;
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1) cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));     
}
 
function setCookie (name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}
 
function setRefCookie(refId) {
	if(refId == '') {return;}
	
	if(getCookie('ref') != '') {
		return;
	}

	var expiry = new Date();
	expiry.setFullYear(2025);
	setCookie('ref', refId, expiry, null, '.gather.com', null);	
}

function setRefInviterCookie(refId) {
	if(refId == '') {return;}

	var expiry = new Date();
	expiry.setFullYear(2025);
	setCookie('invmemid', refId, expiry, null, '.gather.com', null);
}

function setDirectRefCookie() {
  var hostname = location.hostname;
  if (hostname == '' || getCookie('ref') != '') return;

  var result = hostname.match('([^.]*).gather.com');
  var vhost = result[1];
  var refId = "direct_" + vhost;

  var expiry = new Date();
  setCookie('ref', refId, null, null, '.gather.com', null);
}
