/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookieForMI(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function HCOI_MI(_web_site_id,_content_id,_is_page,_location) {
  _current_url = escape(location.href);
  _web_site_id = escape(_web_site_id);
  _content_id = escape(_content_id);
  _is_page = escape(_content_id);
  _location = escape(_content_id);

  _protocol=location.protocol.indexOf('https')>-1?'https:':'http:';
  _cookieServerURL = '/images/clear.gif';
  _colorDepth = window.screen.colorDepth;
  _width = window.screen.width;
  _height = window.screen.height;
  _maxWidth = window.screen.availWidth;
  _maxHeight = window.screen.availHeight;
  _javaEnabled = (navigator.javaEnabled()==true)?"y":"n";
  _cookieEnabled = (navigator.cookieEnabled==true)?"y":"n";
  _userAgent=navigator.appName+" "+navigator.appVersion;
  _userAgentB=navigator.userAgent;
  _mac=(_userAgent.indexOf('Mac'));
  _IE=(_userAgent.indexOf('MSIE'));
  _opera=(_userAgentB.indexOf('Opera'));
  _IEV=(parseInt(_userAgent.substr(_IE+5)));
  _netscape=(_userAgent.indexOf('Netscape'));
  _connectionType='0';
  _homePage='0';
  if((_IE>=0)&&(_IEV>=5)&&(_mac==-1)&&(_opera==-1))  {
        if(document.body){
            document.body.addBehavior("#default#clientCaps");
            _connectionType=document.body.connectionType;
            document.body.addBehavior("#default#homePage");
            _homePage=(document.body.isHomePage(location.href))?"y":"n";
        }
  }
  _HSBC_COOKIEMI= getCookieForMI('HSBC_COOKIEMI');
  _sessionID = getCookieForMI('JSESSIONID'); // the name of the cookie needs to be verified for each site
  _d= new Date();
  _timeZone=_d.getTimezoneOffset()/-60;
  _language='0';
  if((_netscape!=-1)||(_opera!=-1)){
    _language=navigator.language;
  }
  if((_IE!=-1)&&(_opera==-1)){
    _language=navigator.userLanguage;
  }
  _temp='<div style="visibility:hidden;display:none"><img src="'+_cookieServerURL+'?'+_current_url+','+_web_site_id+','+_content_id+','+_is_page+','+_location+','+_colorDepth+','+_width+','+_height+','+_maxWidth+','+_maxHeight+','+_javaEnabled+','+_cookieEnabled+','+_connectionType+','+_homePage+','+_timeZone+','+_language+','+_HSBC_COOKIEMI+','+_sessionID+'" border=0 height=1 width=1 alt="*"></div>';
   document.write(_temp);
}