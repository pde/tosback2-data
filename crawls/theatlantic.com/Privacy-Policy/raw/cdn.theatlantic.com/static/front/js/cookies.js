Atlantic = window.Atlantic || {};

/**
 * We need to set the cookie methods in case they aren't set.
 */
if (typeof Atlantic.Utils.createCookie === "undefined") {
    Atlantic.Utils.createCookie = function(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name+"=" + value + expires + "; path=/";
    };
}

if (typeof Atlantic.Utils.readCookie === "undefined") {
    Atlantic.Utils.readCookie = function(name) {
        var nameEq = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEq) === 0) {
                return c.substring(nameEq.length, c.length);
            }
        }
        return null;
    };
}

if (typeof Atlantic.Utils.eraseCookie === "undefined") {
    Atlantic.Utils.eraseCookie = function(name) {
        Atlantic.Utils.createCookie(name, "", -1);
    };
}

