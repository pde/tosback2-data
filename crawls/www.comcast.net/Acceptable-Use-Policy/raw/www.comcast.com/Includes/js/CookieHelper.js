function getCookieVal(sName)
{
	var val = "";
	var nIndex = document.cookie.indexOf(sName);
	if (nIndex != -1)
	{
		// move past the equal sign
		var nStart = nIndex + sName.length + 1;
		
		// find the end of our cookie value. Either &, ;, or end of string
		var nAmp = document.cookie.indexOf("&", nStart);
		var nSemi = document.cookie.indexOf(";", nStart);

		if ((nAmp != -1 && nAmp < nSemi) || (nSemi == -1 && nAmp != -1)) val = document.cookie.substring(nStart, nAmp);
		else if (nSemi != -1) val = document.cookie.substring(nStart, nSemi);
		else val = document.cookie.substring(nStart, document.cookie.length);
	}

	return unescape(val);
}

function GetCookie(key1,key2)
{       

        var sCookie = new String(document.cookie);
        //alert(sCookie)
        if(key1 != null)
        {
                var aCList = sCookie.split('; ');
                for(var i = 0;i < aCList.length;i++)
                {
                        sCookie = aCList[i];
                        var oReg = new RegExp("(^"+key1+"=)(.*)","ig");
                        var aResult = oReg.exec(sCookie);
                        if(aResult != null)
                        {
                                sCookie = RegExp.$2;
                                if(key2 != null)
                                {
                                        aCList = sCookie.split("&");
                                        for(var i = 0;i < aCList.length;i++)
                                        {
                                                sCookie = aCList[i];
                                                var oReg = new RegExp("(^"+key2+"=)(.*)","ig");
                                                var aResult = oReg.exec(sCookie);;
                                                if(aResult != null)
                                                {
                                                        sCookie = unescape(RegExp.$2);
                                                        break;
                                                }else {
                                                        sCookie = false;
                                                }
                                        }
                                }
                                break;
                        } else {
                                sCookie = false;
                        }
                }
        }
        return sCookie;
}

function SetCookie(sName, sSub, sNewValue, sPath, isPermanent)
{
	if(!sName)
		return;
		
	if(!sNewValue)
		sNewValue = "";
		
	if(!sPath)
		sPath = "/";
	
	sCookie = GetCookie(sName);
	if(sCookie === false)
		sCookie = "";
		
	var sNewCookie = sNewValue;
	var sDomain = "comcast.com";


	if(sSub)
	{
		var sOldValue = GetCookie(sName, sSub);
		if(sOldValue != false || sCookie.indexOf(sSub) != -1)	// Cookies with no value still return false
		{
			var cPrefix = "";
			var sPre = "";
			var sSuf = "";
			
			nStartIndex = sCookie.indexOf('&' + sSub);
			if(nStartIndex > 0 )
			{
				cPrefix = '&';
				sPre = sCookie.substring(0,nStartIndex);
			}
			else
			{
				nStartIndex = 0;
			}
			
			sSub = cPrefix + sSub + "=";
			
			nEndIndex = sCookie.substring(nStartIndex + 1, sCookie.length).indexOf('&');
			if(nEndIndex >= 0)
			{
				nEndIndex += nStartIndex + 1;
				sSuf = sCookie.substring(nEndIndex, sCookie.length)
			}

			sNewCookie = sPre + sSub + sNewValue + sSuf;
		}
		else
		{
			if(sCookie.length > 0)
				sCookie += "&";
			
			sNewCookie = sCookie + sSub + "=" + sNewValue;
		}
	}
	
	if(isPermanent && isPermanent == 'true')
	{
		document.cookie = sName + '=' + sNewCookie + '; expires=Fri, 31 Dec 2020 23:59:59 GMT; path=' + sPath + ";domain=" + sDomain + ';';
	}
	else
	{
		document.cookie = sName + "=" + sNewCookie + "; path=" + sPath + ";domain=" + sDomain + ";";
	}
}

function DeleteCookie(sName, sSub)
{
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++)
	{
		// a name/value pair (a crumb) is separated by an equal sign
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0]) 
		{
			// Get cookie substring
			var sCookieSubString = aCookie[i].substring(aCookie[i].indexOf('='),aCookie[i].length);
			
			// Get index of sSub
			var nSubIndex = sCookieSubString.indexOf(sSub);
			if(nSubIndex != -1)
			{
				var nNextIndex = sCookieSubString.substring(nSubIndex, sCookieSubString.length).indexOf('&');
				// is last key in cookie
				if(nNextIndex == -1)
				{
					nNextIndex = sCookieSubString.length;
				
					// Find possible leading &
					if(sCookieSubString.charAt(nSubIndex - 1) == '&')
					{
						nSubIndex = nSubIndex - 1;
					}
				}
				else
				{
					nNextIndex = nNextIndex + nSubIndex + 1
				}
				
				var sReplaceVal = sCookieSubString.substring(nSubIndex, nNextIndex);
				
				// Replace value
				sCookieSubString = sCookieSubString.replace(sReplaceVal,"");

				// If cookie is now empty, delete whole cookie
				if(sCookieSubString.length == 0)
				{
					document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
				}
				else
				{
					document.cookie = sName + sCookieSubString + "; path=/";
				}
				
				return true;
			}
		}
	}

	// a cookie with the requested name does not exist
	return false;
}

function setExploreCookie()
{
	SetCookie('Explore', "HideExploreIntro", "true", '/', 'true')
}

function getExploreCookie()
{
	if(GetCookie('Explore', 'HideExploreIntro'))
	{
		return true;
	}
	else
	{
		setExploreCookie();
		return false;
	}
}

////////////////////////
/// Check to see if the user
/// has ever logged in before or
/// is currently logged in.
////////////////////////
function onceLoggedIn()
{
	var onceLoggedIn = GetCookie("OnceLoggedIn");
	// Test to see if the OnceLoggedIn cookie is set ( user has logged in before )
	if(onceLoggedIn == "true")
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function setHomePanelCookie(PanelNumber)
{
    SetCookie("HomePanel", false, PanelNumber, false, true);
}

function getHomePanelCookie()
{
	if(!GetCookie("HomePanel"))
	{
		return 0;
	}
	else
	{
		return GetCookie("HomePanel");
	}
}

