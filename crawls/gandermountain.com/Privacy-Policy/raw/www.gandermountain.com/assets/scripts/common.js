/**********************************************************************/
function getCookie(n) 
{
	var dc = document.cookie;
	var prefix = n + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{   begin = dc.indexOf(prefix);
		if (begin != 0) 
			return null;
	} 
	else
		begin += 2;
		
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

/***********************************************************************/
function setCookie(name,value,days,domain,hrs,mins,secure,httponly)
{
	var expires="",ck="",date=""; ttl="";
	
	if((hrs) || (mins) || (days))
	{
		date = new Date();
		if(days) { ttl = date.getTime()+(days*24*60*60*1000); }
		if(hrs)	 { ttl+= date.getTime()+(hrs*60*60*1000); }
		if(mins) { ttl+= date.getTime()+(mins*60*1000); }
		
		date.setTime(ttl);
		expires = "; expires="+date.toGMTString();
	}
	ck = name+"="+value+expires+"; path=/" + ";domain=" +domain;
	
	if(secure)
		ck += "; secure";
	
	if(httponly)
		ck += "; HttpOnly";
	
	if (days != -1)
		document.cookie = ck;
}

/***********************************************************************/
function getQueryStringParamVal(param) { 
	var pval = false;
	var loc = location.search.substring(1, location.search.length);
	var params = loc.split("&");
	for (i=0; i<params.length;i++) {
		pname = params[i].substring(0,params[i].indexOf("="));
		if (pname == param) {
			pval = params[i].substring(params[i].indexOf("=")+1)
		}
	}
	return pval;
}

/***********************************************************************/
function thirdPartyCookie(qsource,tgtval,cname,cval,days,domain)
{
	var qvalue = getQueryStringParamVal(qsource);
	if (qvalue == tgtval)
	{
		setCookie(cname,cval,days,domain,"","","","");
	}
}

/***********************************************************************/
function toggleObject(string)
{
	obj = document.getElementById(string);
	
    if (obj.style.display == "none") 
    {
        showObject(obj,'')
    } else {
        hideObject(obj)
    }
}

// show a section of matching categories (more/fewer)
function showObject(obj,str)
{
	if(!obj) { obj = document.getElementById(str); }
	obj.style.display="";
}

function hideObject(obj,str)
{
	if(!obj) { obj = document.getElementById(str); }
	obj.style.display="none";
}


//------------------------------- stringSplit -------------------------------------------//
function stringSplit(str,del)
{
	if(str == null || str == "")
	{
		return null;
	}
	else if(str.split != null)
	{
		return str.split(del);
	}
	else
	{
		var ar = new Array();
		var i = 0;
		var start = 0;
		
		while(start >= 0 && start < str.length)
		{
			var end = str.indexOf (del,start) ;
			
			if( end >= 0 )
			{
				ar[i++] = str.substring (start,end);
				start = end+1;
			}
			else
			{
				ar[i++] = str.substring (start,str.length);
				start = -1;
			}
		} //end while
		return ar;
	} //end else
} //end function


//-------- form obj ---------------------------
function scan_quans(f)
{
	var flag = false;
	for(n=0; n<f.elements.length; n++)
	{
		if(f.elements[n].name.match(/^quan/))
		{
			if(f.elements[n].value > 0)
			{ flag=true; break; }
		}
	}
	return flag;
}

//-------- form obj, confirm message -----------
function confirm_continue(f,m)
{
	if(scan_quans(f) == false)
	{ var a = confirm(m); return a; }
}



//-------- url, window height, window width -----------
function openWin(url,h,w)
{
	if((h=="") || (typeof(h) =='undefined'))
	{ h=568; }
		
	if((w=="") || (typeof(w) =='undefined'))
	{ w=768; }
		
	var nameW='feature'
	if (navigator.appVersion.indexOf('4') != -1)
	{
		// Vars for centering the new window on Version 4 Browsers
		var xTop = screen.w/2 - (w/2);
		var yTop = screen.h/2 - (h/2);
		var newwindow = window.open(url, nameW, 'height='+h+',width='+w+',scrollbars=yes,resizable=yes,menubar=no,toolbar=no,status=no,left=' + xTop + ',top=' + yTop + '');
	}
	else
	{
		var newwindow = window.open(url, nameW, 'height='+h+',width='+w+',scrollbars=yes,resizable=yes,menubar=no,toolbar=no,status=no,left=150,top=200');
	}
    if (window.focus) { newwindow.focus(); }
}


function fetchPrice(f)
{ f.action=f.cs_action.value; f.r.value=f.cs_request.value; if(f.target != "") { f.target=""; } f.submit(); }

var domain=".gandermountain.com"; var covrssn="co_onvpg";

var gmSecureHostName = 'secure'+domain;
var gmNonSecHostName = 'www'+domain;

// !My Account Globals
window.cgi_account_url = 'https://'+gmSecureHostName+'/my-account/wbsrvcs/myaccount.cgi';

jQuery.noConflict();

var jx_mc=jQuery.noConflict();

jx_mc(document).ready(function() {
  var ic = getCookie('cart_item_count');

  if((ic) && (ic!="0"))
  	ic = "&nbsp;("+ic+")";
  else
	ic = "&nbsp;(0)";
	
  jx_mc("#my-cart a").append(ic);
  
});

function gmRedirectHTTPSToHTTP() {
		if(location.protocol == "https:") {
		var hostPath = gmNonSecHostName + window.location.pathname;
		var goHere = "http://" + hostPath;
		window.location = goHere;
	}
}

function gmRedirectHTTPToHTTPS() {
		if(location.protocol == "http:") {
		var hostPath = gmSecureHostName + window.location.pathname;
		var goHere = "https://" + hostPath;
		window.location = goHere;
	}
}

if(window.vrx_co_onvpg==undefined) {setCookie(covrssn,'0','',domain,'','-10',1);}

function gndr_set_nav_exp(gndrNavVal) {
	setCookie('gndr_nav_setting',gndrNavVal,'',domain,'','','','');
}

thirdPartyCookie("source","linkconn","linkconn",1,30,domain); // if source==linkconn in queryString, set the linkconn cookie to 1

(function() {
    function async_load(){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        lc_protocol= ((location.protocol == "https:") ? "https://" : "http://");
        s.src = lc_protocol + 'www.linkconnector.com/member/JS/traffic_link_client_async.php?mid=25837&cid=3679';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();

var pr_facebook_like_button_url="";


function setClickID(){
	if(navigator.doNotTrack!=undefined && navigator.doNotTrack!="unspecified")
	{
		return;
	}
	var clickid=window.location.search.replace(/\?.*clickid=([a-fA-F0-9]+)&?.*/,"$1");
	if(clickid!=window.location.search)
	{
		setCookie("GANclickid",clickid,0,domain,0,0,false,false);
	}
}
setClickID();
