var cookieManager = new CookieManager();
var rememberMe = cookieManager.getValueIgnoreCase('rememberMe');
var LoggedInUser = cookieManager.getValueIgnoreCase('Login');
    if (rememberMe) {
        var item = null;
        var split = rememberMe.split('&');
        var i = 0;
        var key = null;
        var value = null;

        if (split) {
            while (i < split.length) {
                item = split[i];
                idx = item.indexOf('=');
                key = item.substring(0, idx);

                if (key == 'myName') {
                    value = item.substring(idx + 1)
                    var queryString = new QueryStringManager();
                    var lang = queryString.getValueIgnoreCase('lang');
                    var returnURL = window.location.href;


                    if (lang == null) {
                    
                        if ( (LoggedInUser && LoggedInUser=="true") || LoggedInUser==null)
                        {
                            document.write('<span class="remember-name">Hello, <span class="thename">' + CheckName(value) + '!</span></span> ' + '<span class="remember-cancel">(<a href="/profiles/login.aspx?ResetUser=Y&returnURL=' + returnURL + '">Not ' + CheckName(value) + '?</a>)</span>');
                        }
                    }
                    else {
                        if ( (LoggedInUser && LoggedInUser=="true") || LoggedInUser==null) {
                            document.write('<span class="remember-name">Bonjour, <span class="thename">' + CheckName(value) + '!</span></span> ' + '<span class="remember-cancel">(<a href="/profiles/login.aspx?ResetUser=Y&lang=' + lang + '&returnURL=' + returnURL + '">Non ' + CheckName(value) + '?</a>)</span>');
                        }
                    }
                }

                i = i + 1;
            }
        }
    }

    function CheckName(name) {
            name = decodeURIComponent(name);
            name = name.replace(/\+/g, '');
            name = name.replace(/\s+/g, '');
            return name;
    }