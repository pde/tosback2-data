var omgModule = (function ($) {
    
    var options = {
        'cookie_name' : 'us_isfy'
    };
    
    var isfy = false;

    var checkReferrer = function ()
    {
        var incoming_referrer = document.referrer;
  
        if(incoming_referrer && (typeof incoming_referrer == "string"))
        {
            if(incoming_referrer.search('yahoo.com') != -1 && incoming_referrer.search('search') == -1)
            {
                return true;
            }
        }
        
        return false;
    }
    
    
    var createCookie = function (name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    var readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var eraseCookie = function (name) {
        createCookie(name,"",-1);
    }
    
    var getIsFYCookie = function ()
    {
        return readCookie(options.cookie_name);
    }
    
    var setIsFYCookie = function ()
    {
        createCookie(options.cookie_name, 1);
    }
    
    var getIsfy = function() {
        return isfy;
    }
    
    var init = function ()
    {
        var isfy_cookie = getIsFYCookie();
        var isfy_referrer = false;
        
        if(isfy_cookie && isfy_cookie == 1) {
            isfy = true;
        }
        else {
            
            isfy_referrer = checkReferrer();
            
            if(isfy_referrer) {
                isfy = true;
                setIsFYCookie();
            }
        }
    }
    
    return {
        init : init,
        getIsfy : getIsfy
    }
    
}($));

$(document).ready(function (omg) {
    
    omg.init();
    
    if(omg.getIsfy()) {
        
        $('#omg-header-badge').css('display', 'inline');
    }
    
    
}(omgModule));