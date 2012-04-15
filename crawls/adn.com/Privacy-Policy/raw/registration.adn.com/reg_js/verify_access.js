var login_url;if(! login_url && document.domain.match('preview')){alert('login_url not defined!')};
var known_but_denied_url; if(! known_but_denied_url){known_but_denied_url = login_url};
var known_but_denied = false;
var js_cookie_url;if(! js_cookie_url){js_cookie_url = login_url};var permitted = false;;
var aa;
function cc(n,v,ds){if (ds){var d = new Date();d.setTime(d.getTime()+(ds*24*60*60*1000));var xp = "; expires="+d.toGMTString();}else{var xp = "";}document.cookie = n+"="+v+xp+"; path=/";}function rc(n){var neq = n + "=";var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++){var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(neq) == 0) return c.substring(neq.length,c.length);}return null;}function ec(n){cc(n,"",-1);}

if (! aa)
{
    var acb; var ibc; cc('ct', 1);if(rc('ct')){ec('ct');}else{if (!acb) {document.location = js_cookie_url;}else{ibc=true;}} 
    var th; if (!th){th=0} var dc = false;
    if (th > 0)
    {
        var tm = rc('rtc');
        var dt = new Date();
        var delta = parseInt((dt.getTime() - tm) / 1000); // in minutes.
        if (delta > th)
        {
            dc = true;
        }
    //    document.write('delta: ' +delta + '<br>');
    }
    //document.write('throttled_verify_access<br>');
    var dc; 
    //document.write("throttle: " + th + ' minutes<br>');
    var lc_ua = navigator.userAgent.toLowerCase();
    var lc_browser = navigator.appVersion.toLowerCase();

    if (!ibc && (! th || th && dc) )
    {
    //    document.write('verifying<br>');
        var dt = new Date();
        var rtc =  dt.getTime();
        var r = escape(document.location);
        //Break off the domain/path of the URL.

        var referer = document.referrer;
        var auto_user_url_fragment = '';
        if (referer)
        {
            var url = referer.split("?")[0];
            var fqdn = url.split("/")[2];
            var fqdnParts = fqdn.split(".").reverse();
            var tld = fqdnParts[0];
            var domain = fqdnParts[1];
            var key = domain + '.' + tld;
            // document.write('<br>domain: ' + key + '<br>'); 

            var aud;
            if (!aud) { aud = new Array(); }
            if (aud[key])
            { 
                // document.write('<br>setting au! ') 
                auto_user_url_fragment = ';au=' + aud[key];
            } 
        }

        document.write('<scr' + 'ipt src="' + rs + '/reg_js/access_check.js?t=' + rtc + ';r=' + r + auto_user_url_fragment +'" type="text/javascript"></scr' + 'ipt>');
        document.write('<scr' + 'ipt src="' + rs + '/reg_js/access_check_post.js" type="text/javascript"></scr' + 'ipt>');
        if (th && dc){cc('rtc', rtc)}
    }
    else
    {
    //    document.write('throttled<br>');
    }
}
