
		
/**
 * Author :  Statik
 * Name :    cookieJar
 * Desc :    this script is used to manipulate
 *           cookies. basic fn's  originate
 *           from webcoder.com
 *
 * usage :   setCookie(name, value, expires) - to save a cookie
 *           getCookie(name)                 - to retrieve a cookies' value
 *           delCookie(name)                 - to delete a cookie
 *
 * Notes :   some added NVP fn's are (maybe these should go into js_standard)
 *           getNVPName(string, deLimiter)
 *           getNVPValue(string, deLimiter) 
 */

/* make new date object and set it 5 days ahead */
var exp = new Date();
exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 5));

/* Use this function to save a cookie. */
/*

function setCookie(name, value, expires, path, domain)
{
    cookieName= name;
    cookieVal = escape(value);
    cookiePath = ((path == null) ? "/" : "; path=" + path);
    cookieExpire = ((expires == null) ? "" : "; expires=" + expires.toGMTString());
    cookieDomain = ((domain == null) ? "" : "; domain=" + domain);
    document.cookie = ""+cookieName+cookieVal+cookiePath+cookieExpire+cookieDomain;
}
*/

/*
commented out by lev 7/12/06
function setCookie(name, value, expires, domain)
{
    alert(name + ' ' +  value+ ' ' +  expires+ ' ' +  domain);
    document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString()) + "; domain=" + domain;
}
*/
/* Use this function to retrieve a cookie. */
function getCookie(name)
{
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0)
    {
        begin = dc.indexOf(cname);
		if (name=='GCs' && begin>1 && dc.substring(begin-4, begin+2).toUpperCase()=='MISCGC')
		{
			begin = dc.indexOf(cname, begin + 1);
		}
        if (begin != -1)
        {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

function getCookieValue_bl(cookieGroupName, memberCookieName, deLimiter){
	return getCookieValue(cookieGroupName, memberCookieName, deLimiter, "=");
}
/* Use this function to return a grouped cookie value */
function getCookieValue(cookieGroupName, memberCookieName, deLimiter, propertyAssigner)
{
	var cookies = separateCookieValues(cookieGroupName, deLimiter);
	if(cookies == null) return;
	var counter = 0;
	while(counter < cookies.length)
	{
		var cookie = cookies[counter];
		if(cookie.indexOf(memberCookieName) != -1)
		{
		    //begin = member length + equals
    		var begin = memberCookieName.length + propertyAssigner.length;
    		end = cookie.length;
    		return cookie.substring(begin, end);		
		}
		counter++;
	}
}

/* Use this function to delete a cookie. */
/*

commented out by lev 7/12/06

function delCookie(name)
{
    document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/";
}
*/

/* additional cookie functions and some string mutipulation functions */
 
/* use this function to separate multiple variables from a single cookie value */
function separateCookieValues(name, deLimiter)
{
    var workingString = getCookie(name);                  /* get cookie string */
    if (workingString != null)                            /* check to see if a cookie has been baked */
    {
    	if (name=="GCs")
    	{
	    	if (workingString.substring(0,1)=='"' && workingString.substring(workingString.length-1,workingString.length)=='"' )
	    	{
	    		workingString = workingString.substring(1, workingString.length-1);
	    	}
    	}  	
        var valuesArray = workingString.split(deLimiter); /* set an array into valuesArray */
        return valuesArray;                               /* return array */
    }
    else
    {
    return null;                                          /* if cookie has not been set return null */
    }
}

/**
 * NamedValuePair functions
 * deLimiter not used in NVP_getName, just in there for consistency
 */
 /*
 commented out by lev
function getNVPName(string, deLimiter)
{
    var equals = "=";
    return string.substring(string, string.indexOf(equals));
}
*/
/* here the deLimiter needs to be chopped off the value before it is returned */
 /*
 commented out by lev

function getNVPValue(string, deLimiter)
{
    var equals = "=";
    var begin = string.indexOf(equals);
    begin += equals.length;
    end = string.indexOf(deLimiter, begin);
    if (end == -1) end = string.length;
    return string.substring(begin, end);
}
*/
/* end */