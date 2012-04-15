if (typeof TelligentUtility == "undefined")
{
    var TelligentUtility = new Object();
}

TelligentUtility._authorizationCookieName = "AuthorizationCookie";

TelligentUtility.WriteAuthorizationHeader = function(xhr)
{
    var readCookie = function(input)
    {
        var nameEQ = input + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    var authHeader = readCookie(TelligentUtility._authorizationCookieName);
    if (authHeader != null)
    {
        xhr.setRequestHeader("Authorization-Code", authHeader);
        xhr.setRequestHeader("Rest-Authorization-Code", authHeader);
    }
}
